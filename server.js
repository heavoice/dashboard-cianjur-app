//@ts-check

const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const { initializeDatabase, getSettings } = require("./config/db");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

initializeDatabase();

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use(express.static(path.join(__dirname, "public")));

app.get("api/settings", async (req, res) => {
  try {
    const settings = await getSettings();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

app.get("/api", (req, res) => {
  res.send("Server Started!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
