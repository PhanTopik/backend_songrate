const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

// 🔹 GET semua lagu
router.get("/", async (req, res) => {
  try {
    const songs = await Song.findAll();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 TAMBAH lagu (ADMIN)
router.post("/", authMiddleware, isAdmin, async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json(song);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 UPDATE lagu
router.put("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    await Song.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Song updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 DELETE lagu
router.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    await Song.destroy({ where: { id: req.params.id } });
    res.json({ message: "Song deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
