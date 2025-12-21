const express = require("express");
const router = express.Router();
const News = require("../models/News");
const Song = require("../models/Song");

const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

/* ======================
   SONGS (SUDAH OK)
====================== */

// GET all songs
router.get("/songs", authMiddleware, isAdmin, async (req, res) => {
  const songs = await Song.findAll();
  res.json(songs);
});

// ADD song
router.post("/songs", authMiddleware, isAdmin, async (req, res) => {
  const song = await Song.create(req.body);
  res.status(201).json(song);
});

// UPDATE song
router.put("/songs/:id", authMiddleware, isAdmin, async (req, res) => {
  await Song.update(req.body, { where: { id: req.params.id } });
  const updated = await Song.findByPk(req.params.id);
  res.json(updated);
});

// DELETE song
router.delete("/songs/:id", authMiddleware, isAdmin, async (req, res) => {
  await Song.destroy({ where: { id: req.params.id } });
  res.json({ message: "Song deleted" });
});

/* ======================
   NEWS (FINAL & BENAR)
====================== */

// 🔹 GET all news
router.get("/news", authMiddleware, isAdmin, async (req, res) => {
  const news = await News.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.json(news);
});

// 🔹 ADD news
router.post("/news", authMiddleware, isAdmin, async (req, res) => {
  const news = await News.create(req.body);
  res.status(201).json(news);
});

// 🔹 UPDATE news
router.put("/news/:id", authMiddleware, isAdmin, async (req, res) => {
  await News.update(req.body, { where: { id: req.params.id } });
  const updatedNews = await News.findByPk(req.params.id);
  res.json(updatedNews);
});

// 🔹 DELETE news
router.delete("/news/:id", authMiddleware, isAdmin, async (req, res) => {
  await News.destroy({ where: { id: req.params.id } });
  res.json({ message: "News deleted" });
});

module.exports = router;
