const { pool } = require("../config/db");

async function initializeVisitorTable() {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS visitors (
    id SERIAL PRIMARY KEY,
    user_id INTEGER, -- NULL jika anonim
    ip_address VARCHAR(45),
    user_agent TEXT,
    visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);
    console.log("Visitor table initialized successfully");
  } catch (err) {
    console.log("Error initalizing visitor table: ", err);
  }
}

module.exports = { initializeVisitorTable };
