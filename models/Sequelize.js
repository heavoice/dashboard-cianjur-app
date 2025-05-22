const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import and define the Documentation model
db.Documentation = require("./Documentation")(sequelize, DataTypes);

sequelize
  .sync() // Syncing the models with the database
  .then(() => console.log("Models synced successfully"))
  .catch((error) => console.error("Error syncing models:", error));

module.exports = db;
