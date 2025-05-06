const { pool } = require("../config/db");

async function getSettings() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT key, value FROM settings");
    return result.rows;
  } finally {
    client.release();
  }
}

module.exports = { getSettings };
