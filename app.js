const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db'); // Pastikan file config/db.js kamu benar (lihat poin 2)

// Import Routes
const eventRoutes = require('./routes/events');
const authRoutes = require('./routes/auth'); // <--- TAMBAHKAN INI

const app = express();

// Hubungkan ke Database
connectDB();

// Middleware
app.use(express.json({ extended: false })); // Agar bisa baca JSON dari frontend
app.use(cors()); // Agar frontend beda port bisa akses

// Definisikan Routes (Endpoints)
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes); // <--- TAMBAHKAN INI (Login/Signup akan di /api/auth/signup)

// Test Route
app.get('/', (req, res) => {
  res.send('API SongRATE Running...');
});

module.exports = app;