const { pool } = require("../config/db");

async function initializeUserTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Users table initialized successfully");
  } catch (err) {
    console.error("Error initializing user table:", err);
  }
}

module.exports = { initializeUserTable };
