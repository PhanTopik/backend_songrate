const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const isAdmin = require("../middleware/isAdmin");
const adminController = require("../controllers/adminController");

// Lagu
router.post("/songs", verifyToken, isAdmin, adminController.addSong);
router.put("/songs/:id", verifyToken, isAdmin, adminController.updateSong);
router.delete("/songs/:id", verifyToken, isAdmin, adminController.deleteSong);

// User
router.get("/users", verifyToken, isAdmin, adminController.getAllUsers);

module.exports = router;
