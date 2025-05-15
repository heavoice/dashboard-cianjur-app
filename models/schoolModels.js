const { pool } = require("../config/db");

async function initializeSchoolTable() {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS school (id SERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  instansi TEXT NOT NULL,
  akreditasi CHAR(1),
  alamat TEXT,
  kecamatan TEXT,
  npsn VARCHAR(20),
  koordinat_lat DOUBLE PRECISION,
  koordinat_lng DOUBLE PRECISION);`);
    console.log("School table initialized successfully");
  } catch (err) {
    console.error("Error initializing school table:", err);
  }
}

module.exports = { initializeSchoolTable };
