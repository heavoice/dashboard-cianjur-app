// controllers/userController.js
const { pool } = require("../config/db");

const getUserData = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query(
      "SELECT id, full_name, email FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error getting user data:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserData };
