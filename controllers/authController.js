const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// Ganti ini dengan string rahasia yang aman, sebaiknya taruh di .env
const JWT_SECRET = process.env.JWT_SECRET || 'rahasia_super_aman_123'; 

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Cek apakah user sudah ada
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Buat user baru
    const newUser = await User.create({
      id: uuidv4(),
      username,
      email,
      password: hashedPassword
      // role otomatis "user" dari model
    });

    res.status(201).json({ 
      message: 'User created successfully', 
      userId: newUser.id 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during signup' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Cek password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Buat Token (DITAMBAH ROLE)
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Response (DITAMBAH ROLE)
    res.json({ 
      message: 'Login successful', 
      token, 
      user: { 
        id: user.id, 
        username: user.username, 
        email: user.email,
        role: user.role
      } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = { signup, login };
