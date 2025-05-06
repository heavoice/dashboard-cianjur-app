// middleware/trackVisitor.js
const { pool } = require("../config/db");

const trackVisitor = async (req, res, next) => {
  const userId = req.user ? req.user.id : null;
  const ip = req.ip;
  const userAgent = req.headers["user-agent"];

  try {
    await pool.query(
      "INSERT INTO visitors (user_id, ip_address, user_agent) VALUES ($1, $2, $3)",
      [userId, ip, userAgent]
    );
  } catch (err) {
    console.error("Error tracking visitor:", err);
  }

  next();
};

module.exports = trackVisitor;
