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

    // Parse numeric values
    const rawScore = res.data.score;
    const score = typeof rawScore === 'string' ? parseFloat(rawScore) : rawScore;
    const passingScore = res.data.passing_score;
    const lastUpdated = new Date(res.data.last_score_timestamp).toLocaleString();
    const stamps = res.data.stamps;

    console.log('──────────────────────────────────────────');
    console.log(`Wallet:   ${WALLET}`);
    console.log(`Score:    ${score.toFixed(5)}   Passing: ${passingScore}`);
    console.log(`Updated:  ${lastUpdated}`);
    console.log('──────────────────────────────────────────');

    // Prepare table data
    const tableData = Object.entries(stamps).map(([provider, detail]) => {
      const rawDetailScore = detail.score;
      const detailScore = typeof rawDetailScore === 'string' ? parseFloat(rawDetailScore) : rawDetailScore;
      return {
        Provider: provider,
        Score: detailScore.toFixed(5),
        Expiry: detail.expiration_date || '-'
      };
    });

    console.table(tableData);

  } catch (err) {
    const msg = err.response?.data?.detail || err.message;
    console.error('❌ Error fetching Passport score:', msg);
  }
}

getPassportScore();
