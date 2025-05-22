//@ts-check
const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const visitorRoutes = require("./routes/visitor");
const schoolRoutes = require("./routes/school");
const documentationRoutes = require("./routes/documentation");

const trackVisitor = require("./middleware/trackVisitor");
const authenticateUser = require("./middleware/authMiddleware");
const errorHandler = require("./middleware/errorHandler");

const { initializeUserTable } = require("./models/userModels");
const { initializeVisitorTable } = require("./models/visitorModels");
const { initializeSchoolTable } = require("./models/schoolModels");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Inisialisasi tabel Sequelize
initializeVisitorTable();
initializeUserTable();
initializeSchoolTable();

// Middleware global
app.use(authenticateUser);
app.use(trackVisitor);

// Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", visitorRoutes);
app.use("/api", schoolRoutes);
app.use("/api", documentationRoutes);

// Health check
app.get("/api", (req, res) => {
  res.send("Server Started!");
});

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(errorHandler);

module.exports = app;
