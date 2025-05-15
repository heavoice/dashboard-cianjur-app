const express = require("express");
const router = express.Router();
const { getSchools } = require("../controllers/schoolController");

router.get("/sekolah", getSchools);

module.exports = router;
