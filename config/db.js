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

    // Fix NULL timestamps before sync (untuk data lama)
    try {
      await sequelize.query(`
        UPDATE "Users" 
        SET created_at = NOW(), updated_at = NOW() 
        WHERE created_at IS NULL OR updated_at IS NULL
      `);
      console.log("✅ Fixed NULL timestamps in Users table");
    } catch (err) {
      // Table might not exist yet, which is fine
      console.log("ℹ️ Skipping timestamp fix (table may not exist yet)");
    }

    // Sync all models with database
    await sequelize.sync({ alter: true });
    console.log("✅ Database models synced successfully");
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
