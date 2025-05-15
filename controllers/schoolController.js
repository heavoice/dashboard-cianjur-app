const { pool } = require("../config/db");

const getSchools = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM school ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching schools:", error);
    res.status(500).json({ message: "Failed to fetch schools", error });
  }
};

module.exports = { getSchools };
