// middleware/trackVisitor.js
const { pool } = require("../config/db");

const knownBots = [
  "vercel-screenshot",
  "undici",
  "Googlebot",
  "Bingbot",
  "Slurp",
  "DuckDuckBot",
  "Baiduspider",
  "YandexBot",
  "facebookexternalhit",
  "Twitterbot",
  "MJ12bot",
];

const isBot = (userAgent) => {
  return knownBots.some((bot) =>
    userAgent.toLowerCase().includes(bot.toLowerCase())
  );
};

const trackVisitor = async (req, res, next) => {
  const userId = req.user ? req.user.id : null;
  const ip = req.ip;
  const userAgent = req.headers["user-agent"];

  if (isBot(userAgent)) {
    return next();
  }

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
