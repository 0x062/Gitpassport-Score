# 🚀 Passport-Score

💡 Simple Node.js script to fetch and display your **Gitcoin Passport** (Unique Humanity) score in a sleek console table.

## ✨ Features

* 📊 Fetches current Passport score and stamp details via **Gitcoin Passport API v2**
* 🎨 Nicely formatted console output with headers and `console.table`
* 🔢 Handles numeric parsing and formatting
* 🕒 Displays provider, individual stamp score, and expiration date

## 📋 Prerequisites

* 🖥️ Node.js v14 or higher
* 📦 NPM (comes with Node.js)
* 🔑 A Gitcoin Passport **API key** (`GITCOIN_API_KEY`)
* 🆔 Your Passport **Scorer ID** (`SCORER_ID`)
* 💳 Ethereum wallet address (`WALLET_ADDRESS`)

## 🚀 Installation

1. **Clone repository**

   ```bash
   git clone https://github.com/<your-username>/passport-score.git
   cd passport-score
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file** in project root:

   ```dotenv
   GITCOIN_API_KEY=your_api_key_here
   SCORER_ID=your_scorer_id_here
   WALLET_ADDRESS=0xYourWalletAddress
   ```

## ▶️ Usage

Run the script using NPM:

```bash
npm start
```

You should see output similar to:

```
──────────────────────────────────────────
Wallet:   0x4375d555ede2a6f1892104a5a953fa9c2ea18bf8
Score:    25.11300   Passing: true
Updated:  5/5/2025, 2:39:43 AM
──────────────────────────────────────────
┌─────────┬───────────────────┬─────────┬───────────────────────────────┐
│ (index) │     Provider      │  Score  │            Expiry             │
├─────────┼───────────────────┼─────────┼───────────────────────────────┤
│    0    │ 'ETHScore#50'     │ '16.02100' │ '2025-08-02T18:36:07.084000+00:00' │
│   ...   │       ...         │   ...    │              ...              │
└─────────┴───────────────────┴─────────┴───────────────────────────────┘
```

## 🔧 Configuration

* **Environment Variables**

  * `GITCOIN_API_KEY`: Your API key from [Passport Developer Portal](https://developer.passport.xyz)
  * `SCORER_ID`: Scorer ID linked to your API key (found in portal)
  * `WALLET_ADDRESS`: Ethereum wallet address to query

* **Script file**: `getPassportScore.js` contains the core logic. Modify formatting or output as needed.

## 🛠️ Customization

* **Filter stamps**: Adjust the `tableData` mapping to include/exclude specific providers.
* **Output destination**: Write JSON or CSV by integrating `fs` or `json2csv`.
* **Automation**: Schedule via cron, GitHub Actions, or serverless functions.

## 🐞 Troubleshooting

* **`score.toFixed is not a function`**: Ensure API returns numeric values; script parses strings.
* **`403 Forbidden`**: Check `X-API-KEY` header and rate limits.

Happy hacking! 😎
