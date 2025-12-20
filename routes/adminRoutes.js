const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

// Dashboard Admin
router.get("/dashboard", authMiddleware, isAdmin, (req, res) => {
  res.json({
    message: "Welcome to Admin Dashboard",
    user: req.user,
  });
});

// Get semua users
router.get("/users", authMiddleware, isAdmin, adminController.getAllUsers);

// Add Song
router.post("/songs", authMiddleware, isAdmin, adminController.addSong);

// Update Song
router.put("/songs/:id", authMiddleware, isAdmin, adminController.updateSong);

// Delete Song
router.delete(
  "/songs/:id",
  authMiddleware,
  isAdmin,
  adminController.deleteSong
);

// ========== ARTIST ROUTES ==========

// Get all artists
router.get("/artists", authMiddleware, isAdmin, adminController.getAllArtists);

// Add Artist
router.post("/artists", authMiddleware, isAdmin, adminController.addArtist);

// Update Artist
router.put("/artists/:id", authMiddleware, isAdmin, adminController.updateArtist);

// Delete Artist
router.delete("/artists/:id", authMiddleware, isAdmin, adminController.deleteArtist);

module.exports = router;
