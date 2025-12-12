const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const reviewRoutes = require('./routes/reviews');
const authRoutes = require('./routes/auth'); 

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173'
}));

app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API SongRATE Running...');
});

module.exports = app;