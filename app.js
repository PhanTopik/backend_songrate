const express = require('express');
const { connectDB } = require('./config/db');
const eventRoutes = require('./routes/events');
const cors = require('cors');

const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use(cors());

app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
  res.send('API Running');
});

module.exports = app;