const { Sequelize } = require('sequelize');

// Setup koneksi SQLite (File database akan muncul sebagai 'database.sqlite')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Lokasi file DB
  logging: false // Set true jika ingin melihat query SQL di terminal
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ SQLite Database Connected...');
    
    // Sinkronisasi Model ke Database (Membuat tabel jika belum ada)
    await sequelize.sync(); 
    console.log('✅ Models Synced...');
  } catch (err) {
    console.error('❌ Database Connection Error:', err.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };