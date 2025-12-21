const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Ganti ini dengan string rahasia yang aman, sebaiknya taruh di .env
const JWT_SECRET = process.env.JWT_SECRET || "rahasia_super_aman_123";

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Cek apakah user sudah ada
    const existingUser = await user.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Buat user baru
    const newuser = await user.create({
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
      // role otomatis "user" dari model
    });

    res.status(201).json({
      message: "User created successfully",
      userId: newuser.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during signup" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari user
    const foundUser = await user.findOne({ where: { email } });
    if (!foundUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Cek password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Buat Token (DITAMBAH ROLE)
    const token = jwt.sign(
      {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Response (DITAMBAH ROLE DAN REDIRECT URL)
    res.json({
      message: "Login successful",
      token,
      user: {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role,
      },
      redirectUrl: foundUser.role === "admin" ? "/admin" : "/dashboard",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login" });
  }
};

module.exports = { signup, login };
