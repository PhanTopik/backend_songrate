const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const adminController = require("../controllers/adminController");

// Lagu
router.post("/songs", authMiddleware, isAdmin, adminController.addSong);
router.put("/songs/:id", authMiddleware, isAdmin, adminController.updateSong);
router.delete("/songs/:id", authMiddleware, isAdmin, adminController.deleteSong);

// User
router.get("/users", (req, res, next) => {
  console.log("🔥 ADMIN USERS ROUTE HIT");
  next();
}, authMiddleware, isAdmin, adminController.getAllUsers);


module.exports = router;
