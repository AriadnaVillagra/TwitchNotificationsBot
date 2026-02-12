# 🎮 Twitch Notifications Bot for Discord

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![ES Modules](https://img.shields.io/badge/Modules-ESM-1f6feb)
![Discord.js](https://img.shields.io/badge/Discord.js-v14-5865F2?logo=discord&logoColor=white)
![Twitch
API](https://img.shields.io/badge/Twitch-Helix-9146FF?logo=twitch&logoColor=white)
![Bundled with
esbuild](https://img.shields.io/badge/Bundled-esbuild-FFCF00) ![Packaged
with pkg](https://img.shields.io/badge/Packaged-pkg-F05032)
![License](https://img.shields.io/badge/License-MIT-green)

------------------------------------------------------------------------

A modern **Node.js (ES Modules) Discord bot** that automatically
notifies a Discord channel when a Twitch stream goes live.

This project demonstrates:

-   Twitch Helix API integration\
-   Discord Bot API usage\
-   Environment-based configuration\
-   Polling logic with anti-spam protection\
-   Backend bundling using **esbuild**\
-   Packaging into a standalone Windows executable using **pkg**

------------------------------------------------------------------------

## ✨ Features

-   🔴 Sends a notification when a Twitch channel goes live\
-   🚫 Prevents duplicate notifications per stream session\
-   ⚙️ Fully configurable via environment variables\
-   🧩 Development / Production modes\
-   📦 Can be bundled into a standalone `.exe`

------------------------------------------------------------------------

## 🏗️ Technical Architecture

This project uses:

-   **Node.js 18+**
-   **ES Modules (ESM)** (`"type": "module"`)
-   Native `fetch`
-   **esbuild** for bundling
-   **pkg** for runtime packaging

### Build Flow

    index.js (ESM source)
          ↓
    esbuild bundle
          ↓
    Single CommonJS file
          ↓
    pkg packaging
          ↓
    Standalone Windows executable

### Why bundling is required

Since the project is written using modern **ES Modules**, it is first
bundled with `esbuild` into a CommonJS single-file output.

This ensures compatibility with `pkg`, which packages:

-   The Node runtime\
-   The bundled application

into a single `.exe` file.

------------------------------------------------------------------------

## 🧰 Requirements

-   Node.js 18+
-   A Discord server with admin permissions
-   A Discord Bot Token
-   A Twitch account
-   Twitch Client ID & Client Secret

------------------------------------------------------------------------

## ⚙️ Environment Variables

Create a `.env` file based on:

    .env.example

Example:

``` env
# Discord configuration
DISCORD_TOKEN=your_discord_bot_token
DISCORD_CHANNEL_ID=your_discord_channel_id

# Twitch configuration
TWITCH_CLIENT_ID=your_twitch_client_id
TWITCH_CLIENT_SECRET=your_twitch_client_secret
TWITCH_LOGIN=your_twitch_username

# Poll interval (seconds)
CHECK_SECONDS=90

# Optional startup test message
SEND_STARTUP_MESSAGE=true
STARTUP_MESSAGE=✅ Bot connected and ready.
```

⚠️ Never commit your `.env` file.

------------------------------------------------------------------------

## ▶️ Run Locally (Development)

Install dependencies:

``` bash
npm install
```

Start the bot:

``` bash
npm start
```

------------------------------------------------------------------------

## 📦 Build Standalone Executable (Windows)

Install dependencies:

``` bash
npm install
```

Generate executable:

``` bash
npm run build
```

Output:

    dist/bot.exe

Before running the executable:

Copy your `.env` file next to:

    dist/bot.exe

Then double-click `bot.exe`.

------------------------------------------------------------------------

## 📂 Repository Structure

    notificationsBotDiscord/
    │
    ├── index.js
    ├── package.json
    ├── package-lock.json
    ├── .env.example
    ├── README.md
    ├── .gitignore

Ignored (generated files):

    node_modules/
    build/
    dist/
    .env

------------------------------------------------------------------------

## ☁️ Hosting

Can be deployed to:

-   Render
-   Railway
-   Any Node-compatible environment

Use:

Build command: npm install\
Start command: npm start

------------------------------------------------------------------------

## 🔒 Security Notes

-   Never share your Discord or Twitch tokens\
-   Never commit your `.env` file\
-   Regenerate leaked secrets immediately

------------------------------------------------------------------------

## 📄 License

MIT License

------------------------------------------------------------------------

## 💜 Author

Created by **Ariadna Villagra**

Contributions, issues and pull requests are welcome.
