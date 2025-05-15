//@ts-check

const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const visitorRoutes = require("./routes/visitor");
const schoolRoutes = require("./routes/school.js");
const { initializeUserTable } = require("./models/userModels");
const { initializeVisitorTable } = require("./models/visitorModels");
const { initializeSchoolTable } = require("./models/schoolModels");
const trackVisitor = require("./middleware/trackVisitor");
const authenticateUser = require("./middleware/authMiddleware");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

initializeVisitorTable();
initializeUserTable();
initializeSchoolTable();

app.use(authenticateUser);
app.use(trackVisitor);
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", visitorRoutes);
app.use("/api", schoolRoutes);

app.get("/api", (req, res) => {
  res.send("Server Started!");
});
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
