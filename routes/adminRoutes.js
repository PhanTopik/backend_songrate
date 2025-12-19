const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

router.get("/users", authMiddleware, isAdmin, (req, res) => {
  res.json({ message: "ADMIN USERS OK" });
});

module.exports = router;
