require('dotenv').config();
const axios = require('axios');

const API_KEY   = process.env.GITCOIN_API_KEY;
const SCORER_ID = process.env.SCORER_ID;
const WALLET    = process.env.WALLET_ADDRESS;
const BASE_URL  = 'https://api.passport.xyz';
const URL       = `${BASE_URL}/v2/stamps/${SCORER_ID}/score/${WALLET}`;

if (!API_KEY || !SCORER_ID || !WALLET) {
  console.error('⚠️ Pastikan GITCOIN_API_KEY, SCORER_ID, dan WALLET_ADDRESS sudah di-.env');
  process.exit(1);
}

async function getPassportScore() {
  try {
    const res = await axios.get(URL, {
      headers: { 'X-API-KEY': API_KEY }
    });

    const { score, stamps, passing_score, last_score_timestamp } = res.data;
    console.log(`✅ [${WALLET}] Score: ${score} (passing: ${passing_score})`);
    console.log(`  last updated: ${new Date(last_score_timestamp).toLocaleString()}`);
    console.log('Detail stamps:');
    for (const [provider, detail] of Object.entries(stamps)) {
      console.log(` • ${provider}: ${detail.score}` +
                  (detail.expiration_date ? ` (exp: ${detail.expiration_date})` : ''));
    }
  } catch (err) {
    const msg = err.response?.data?.detail || err.message;
    console.error('❌ Error fetching Passport score:', msg);
  }
}

getPassportScore();
