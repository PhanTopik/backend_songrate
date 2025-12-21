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
    // Tambahkan kolom created_at dan updated_at jika belum ada, dengan default NOW()
    const tablesToFix = ['Users', 'Songs', 'Artists', 'News'];

    for (const table of tablesToFix) {
      try {
        // Cek apakah kolom ada dan tambahkan jika belum
        await sequelize.query(`
          DO $$ 
          BEGIN
            -- Tambah kolom created_at jika belum ada
            IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                          WHERE table_name = '${table}' AND column_name = 'created_at') THEN
              ALTER TABLE "${table}" ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
            END IF;
            
            -- Tambah kolom updated_at jika belum ada
            IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                          WHERE table_name = '${table}' AND column_name = 'updated_at') THEN
              ALTER TABLE "${table}" ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
            END IF;
            
            -- Update NULL values ke NOW()
            UPDATE "${table}" SET created_at = NOW() WHERE created_at IS NULL;
            UPDATE "${table}" SET updated_at = NOW() WHERE updated_at IS NULL;
            
            -- Set NOT NULL constraint jika belum ada
            ALTER TABLE "${table}" ALTER COLUMN created_at SET NOT NULL;
            ALTER TABLE "${table}" ALTER COLUMN updated_at SET NOT NULL;
            ALTER TABLE "${table}" ALTER COLUMN created_at SET DEFAULT NOW();
            ALTER TABLE "${table}" ALTER COLUMN updated_at SET DEFAULT NOW();
          END $$;
        `);
        console.log(`✅ Fixed timestamps for ${table} table`);
      } catch (err) {
        console.log(`ℹ️ Skipping ${table}: ${err.message}`);
      }
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
