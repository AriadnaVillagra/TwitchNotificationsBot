import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';

const {
    DISCORD_TOKEN,
    DISCORD_CHANNEL_ID,
    TWITCH_CLIENT_ID,
    TWITCH_CLIENT_SECRET,
    TWITCH_LOGIN,
    CHECK_SECONDS = '90',
} = process.env;

if (!DISCORD_TOKEN || !DISCORD_CHANNEL_ID || !TWITCH_CLIENT_ID || !TWITCH_CLIENT_SECRET || !TWITCH_LOGIN) {
    console.error('Faltan variables en .env');
    process.exit(1);
}

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

let twitchAccessToken = null;
let twitchTokenExp = 0;

async function getTwitchAccessToken() {
    const now = Date.now();
    if (twitchAccessToken && now < twitchTokenExp - 60_000) return twitchAccessToken;

    const params = new URLSearchParams({
        client_id: TWITCH_CLIENT_ID,
        client_secret: TWITCH_CLIENT_SECRET,
        grant_type: 'client_credentials',
    });

    const res = await fetch(`https://id.twitch.tv/oauth2/token`, {
        method: 'POST',
        body: params,
    });

    if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Error token Twitch: ${res.status} ${txt}`);
    }

    const data = await res.json();
    twitchAccessToken = data.access_token;
    twitchTokenExp = Date.now() + (data.expires_in * 1000);
    return twitchAccessToken;
}

async function twitchIsLive() {
    const token = await getTwitchAccessToken();
    const url = `https://api.twitch.tv/helix/streams?user_login=${encodeURIComponent(TWITCH_LOGIN)}`;

    const res = await fetch(url, {
        headers: {
            'Client-ID': TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Error Helix streams: ${res.status} ${txt}`);
    }

    const data = await res.json();
    const stream = data?.data?.[0];
    if (!stream) return { live: false };

    return {
        live: true,
        title: stream.title,
        game: stream.game_name,
        startedAt: stream.started_at,
    };
}

// Anti-spam: avisar 1 vez por "sesión en vivo"
let lastLiveState = false;
let lastAnnouncedStartedAt = null;

async function checkAndNotify() {
    try {
        const channel = await client.channels.fetch(DISCORD_CHANNEL_ID);
        if (!channel || !channel.isTextBased()) return;

        const status = await twitchIsLive();

        if (!status.live) {
            lastLiveState = false;
            lastAnnouncedStartedAt = null;
            return;
        }

        // Si está live, avisar solo si es una sesión nueva
        if (!lastLiveState || (status.startedAt && status.startedAt !== lastAnnouncedStartedAt)) {
            const url = `https://twitch.tv/${TWITCH_LOGIN}`;

            await channel.send({
                content: `🔴 **${TWITCH_LOGIN} está en vivo!**\n🎮 ${status.game ?? '—'}\n📝 ${status.title ?? '—'}\n👉 ${url}`,
            });

            lastLiveState = true;
            lastAnnouncedStartedAt = status.startedAt ?? new Date().toISOString();
        }
    } catch (err) {
        console.error('[checkAndNotify]', err.message);
    }
}

function envBool(value, defaultValue = false) {
    if (value == null) return defaultValue;
    return ['1', 'true', 'yes', 'y', 'on'].includes(String(value).toLowerCase().trim());
}

client.once('ready', async () => {
    console.log(`Conectado como ${client.user.tag}`);

    const sendStartup = envBool(process.env.SEND_STARTUP_MESSAGE, false);
    const startupMsg = process.env.STARTUP_MESSAGE || "✅ Bot connected and ready. (Test message)";

    if (sendStartup) {
        try {
            const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID);
            if (channel && channel.isTextBased()) {
                await channel.send(startupMsg);
            } else {
                console.log("No pude encontrar el canal o no es de texto.");
            }
        } catch (e) {
            console.log("Error enviando mensaje de prueba:", e?.message ?? e);
        }
    }

    checkAndNotify();
    setInterval(checkAndNotify, Number(process.env.CHECK_SECONDS ?? "90") * 1000);
});

client.login(DISCORD_TOKEN);
