// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/authjwt");
const { getUserData } = require("../controllers/userController");

// Route untuk mendapatkan data pengguna yang sedang login
router.get("/me", authenticateJWT, getUserData);

module.exports = router;
