const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const controller = require("../controllers/feedbackController");

router.post("/umpan", upload.none(), controller.createFeedback);
router.get("/umpan", controller.getAllFeedback);

module.exports = router;
