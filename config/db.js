const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to Railway PostgreSQL");

    // Import models
    require("../models/user");
    require("../models/Song");
    require("../models/Artist");
    require("../models/comment");
    require("../models/News"); // ⬅️ INI KUNCINYA

    // Sync all models with database
    await sequelize.sync({ alter: true });
    console.log("✅ Database models synced successfully");
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
