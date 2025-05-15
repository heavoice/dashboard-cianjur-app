// controllers/visitorController.js
const { pool } = require("../config/db");

const getVisitorStats = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*) FILTER (WHERE user_id IS NULL) AS anonymous_visitors,
        COUNT(*) FILTER (WHERE user_id IS NOT NULL) AS logged_in_visitors,
        COUNT(*) AS total_visitors
      FROM visitors;
    `);

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error getting visitor stats:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getVisitorStats,
};
