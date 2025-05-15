// routes/visitor.js
const express = require("express");
const router = express.Router();
const { getVisitorStats } = require("../controllers/visitorController");

router.get("/visitor-stats", getVisitorStats);

module.exports = router;
