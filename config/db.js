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
    const tablesToFix = ['Users', 'Songs', 'Artists', 'Comments', 'News'];

    for (const table of tablesToFix) {
      try {
        // First, update NULL values
        const [results] = await sequelize.query(`
          UPDATE "${table}" 
          SET created_at = COALESCE(created_at, NOW()), 
              updated_at = COALESCE(updated_at, NOW()) 
          WHERE created_at IS NULL OR updated_at IS NULL
        `);
        console.log(`✅ Fixed NULL timestamps in ${table} table`);
      } catch (err) {
        console.log(`ℹ️ Skipping ${table}: ${err.message}`);
      }
    }

    // Khusus untuk Users - set default value dulu sebelum sync
    try {
      await sequelize.query(`
        ALTER TABLE "Users" 
        ALTER COLUMN created_at SET DEFAULT NOW(),
        ALTER COLUMN updated_at SET DEFAULT NOW()
      `);
      console.log("✅ Set default timestamps for Users table");
    } catch (err) {
      console.log(`ℹ️ Could not alter Users defaults: ${err.message}`);
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
