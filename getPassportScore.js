// getPassportScore.js
require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.GITCOIN_API_KEY;       // dari .env
const WALLET = process.env.WALLET_ADDRESS;        // atau langsung string
const URL    = `https://api.scorer.gitcoin.co/v2/passport/analysis/${WALLET}`;

async function fetchScore() {
  try {
    const res = await axios.get(URL, {
      headers: { 'X-API-KEY': API_KEY }
    });
    console.log('Score:', res.data.score);
    console.table(res.data.stamps.map(s => ({ provider: s.provider, score: s.score })));
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}

fetchScore();
