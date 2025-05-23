const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const controller = require("../controllers/documentationController");

router.post("/upload", upload.single("file"), controller.uploadDocumentation);
router.get("/dokumentasi", controller.getAllDocumentation);

module.exports = router;
