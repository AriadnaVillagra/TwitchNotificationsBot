# 🎮 Twitch Notifications Bot for Discord

A simple **Node.js Discord bot** that sends a notification to a Discord channel when a Twitch stream goes live.

Perfect for streamers who want automatic **“🔴 I’m live!”** messages without relying on third-party bots.

---

## ✨ Features

- 🔴 Notifies when a Twitch channel goes live
- 🚫 No spam (only one notification per stream session)
- ⚙️ Fully configurable via environment variables
- 🆓 Can be hosted for free (Render, Railway, etc.)
- 🧩 Easy to extend and customize

---

## 📸 Example notification

```
🔴 makttub_dota is live!
🎮 Dota 2
📝 Ranked grind with chat
👉 https://twitch.tv/makttub_dota
```

---

## 🧰 Requirements

To use this bot you will need:

- **Node.js 18+**
- A **Discord server** where you have admin permissions
- A **Discord bot token**
- A **Twitch account**
- A **Twitch Client ID & Client Secret**

---

## ⚙️ Environment variables

This project uses environment variables for configuration.

An example file is provided:

```
.env.example
```

Create your own `.env` file by copying it:

```bash
cp .env.example .env
```

### 📄 `.env.example`

```env
# Discord configuration
DISCORD_TOKEN=your_discord_bot_token
DISCORD_CHANNEL_ID=your_discord_channel_id

# Twitch configuration
TWITCH_CLIENT_ID=your_twitch_client_id
TWITCH_CLIENT_SECRET=your_twitch_client_secret
TWITCH_LOGIN=your_twitch_username

# How often (in seconds) the bot checks if the stream is live
CHECK_SECONDS=90
```

⚠️ **Never commit your `.env` file.**

---

## 🔍 Where to get each value

### 🟣 DISCORD_TOKEN
1. Go to https://discord.com/developers/applications
2. Create a new application
3. Go to **Bot → Add Bot**
4. Copy the **Bot Token**

---

### 🟣 DISCORD_CHANNEL_ID
1. Open Discord → **User Settings → Advanced**
2. Enable **Developer Mode**
3. Right click the target channel → **Copy ID**

---

### 🟣 TWITCH_CLIENT_ID & TWITCH_CLIENT_SECRET
1. Go to https://dev.twitch.tv/console/apps
2. Register a new application
3. Set:
   - **Redirect URL**: `http://localhost`
   - **Category**: Application Integration
   - **Type**: Confidential
4. Copy:
   - Client ID
   - Client Secret

---

### 🟣 TWITCH_LOGIN
Your Twitch username (lowercase).

Example:
```
https://twitch.tv/makttub_dota
```

```env
TWITCH_LOGIN=makttub_dota
```

---

## ▶️ Running the bot locally

Install dependencies:

```bash
npm install
```

Start the bot:

```bash
npm start
```

If everything is correct, you should see:

```
Connected as Twitch Live Notifier#1234
```

---

## ☁️ Hosting (Render example)

This bot can be hosted for free using **Render**.

### Steps:
1. Push this repository to GitHub
2. Go to https://render.com
3. Create a **Background Worker**
4. Connect your GitHub repository
5. Set:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add the same environment variables from `.env` in Render’s dashboard

⚠️ Note: On Render free tier, the service may sleep when inactive.

---

## 🔒 Security notes

- Never share your Discord or Twitch tokens
- Never commit your `.env` file
- If a secret is leaked, regenerate it immediately

---

## 📄 License

MIT License

---

## 💜 Author

Created by **Ariadna Villagra**  
Contributions, issues and pull requests are welcome!
