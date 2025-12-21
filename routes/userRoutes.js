const express = require("express");
const router = express.Router();
const user = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

// 🔹 GET semua user (ADMIN)
router.get("/", authMiddleware, isAdmin, async (req, res) => {
  try {
    const users = await user.findAll({
      attributes: ["id", "email", "username", "role", "created_at"],
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
