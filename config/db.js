const { Sequelize } = require('sequelize');
require('dotenv').config();

// Setup koneksi PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Database Connected...');
    
    await sequelize.sync({ alter: true }); 
    console.log('✅ Models Synced to PostgreSQL...');
  } catch (err) {
    console.error('❌ Database Connection Error:', err.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };