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
    console.error("GET /api/songs error:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch songs", error: err.message });
  }
});

// 🔹 TAMBAH lagu (ADMIN)
router.post("/", authMiddleware, isAdmin, async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json(song);
  } catch (err) {
    console.error("POST /api/songs error:", err);
    res
      .status(500)
      .json({ message: "Failed to create song", error: err.message });
  }
});

// 🔹 UPDATE lagu
router.put("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    await Song.update(req.body, { where: { id: req.params.id } });
    const updatedSong = await Song.findByPk(req.params.id);
    res.json({ message: "Song updated", song: updatedSong });
  } catch (err) {
    console.error("PUT /api/songs/:id error:", err);
    res
      .status(500)
      .json({ message: "Failed to update song", error: err.message });
  }
});

// 🔹 DELETE lagu
router.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    await Song.destroy({ where: { id: req.params.id } });
    res.json({ message: "Song deleted" });
  } catch (err) {
    console.error("DELETE /api/songs/:id error:", err);
    res
      .status(500)
      .json({ message: "Failed to delete song", error: err.message });
  }
});

module.exports = router;
