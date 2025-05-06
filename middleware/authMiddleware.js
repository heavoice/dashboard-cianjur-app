const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = null;
    return next(); // lanjutkan sebagai anonim
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // misalnya token berisi { id: 123 }
    next();
  } catch (err) {
    req.user = null;
    next(); // token tidak valid → anggap anonim
  }
};

module.exports = authenticateUser;
