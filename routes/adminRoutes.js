const express = require("express");
const router = express.Router();
const News = require("../models/News");
const Song = require("../models/Song");
const Artist = require("../models/Artist");
const Comment = require("../models/comment");
const User = require("../models/user");

const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

/* ======================
   SONGS (SUDAH OK)
====================== */

// GET all songs
router.get("/songs", authMiddleware, isAdmin, async (req, res) => {
  try {
    const songs = await Song.findAll();
    res.json(songs);
  } catch (err) {
    console.error("GET /api/admin/songs error:", err);
    res.status(500).json({ message: "Failed to fetch songs", error: err.message });
  }
});

// ADD song
router.post("/songs", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { title, artist } = req.body;
    if (!title || !artist) {
      return res.status(400).json({ message: "Title and Artist are required" });
    }
    const song = await Song.create(req.body);
    res.status(201).json(song);
  } catch (err) {
    console.error("POST /api/admin/songs error:", err);
    res.status(500).json({ message: "Failed to add song", error: err.message });
  }
});

// UPDATE song
router.put("/songs/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    await Song.update(req.body, { where: { id: req.params.id } });
    const updated = await Song.findByPk(req.params.id);
    res.json(updated);
  } catch (err) {
    console.error("PUT /api/admin/songs/:id error:", err);
    res.status(500).json({ message: "Failed to update song", error: err.message });
  }
});

// DELETE song
router.delete("/songs/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    await Song.destroy({ where: { id: req.params.id } });
    res.json({ message: "Song deleted" });
  } catch (err) {
    console.error("DELETE /api/admin/songs/:id error:", err);
    res.status(500).json({ message: "Failed to delete song", error: err.message });
  }
});

/* ======================
   ARTISTS
====================== */

// GET all artists
router.get("/artists", authMiddleware, isAdmin, async (req, res) => {
  try {
    const artists = await Artist.findAll({ order: [["name", "ASC"]] });
    res.json({ message: "Artists retrieved successfully", artists });
  } catch (err) {
    console.error("GET /api/admin/artists error:", err);
    res.status(500).json({ message: "Failed to fetch artists", error: err.message });
  }
});

// ADD artist
router.post("/artists", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Artist name is required" });
    }

    // Check if artist already exists
    const existing = await Artist.findOne({ where: { name: name.trim() } });
    if (existing) {
      return res.status(400).json({ message: "Artist with this name already exists" });
    }

    const artist = await Artist.create(req.body);
    res.status(201).json({ message: "Artist added successfully", artist });
  } catch (err) {
    console.error("POST /api/admin/artists error:", err);
    res.status(500).json({ message: "Failed to add artist", error: err.message });
  }
});

// UPDATE artist
router.put("/artists/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }
    await Artist.update(req.body, { where: { id: req.params.id } });
    const updated = await Artist.findByPk(req.params.id);
    res.json({ message: "Artist updated successfully", artist: updated });
  } catch (err) {
    console.error("PUT /api/admin/artists/:id error:", err);
    res.status(500).json({ message: "Failed to update artist", error: err.message });
  }
});

// DELETE artist
router.delete("/artists/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }
    await Artist.destroy({ where: { id: req.params.id } });
    res.json({ message: "Artist deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/admin/artists/:id error:", err);
    res.status(500).json({ message: "Failed to delete artist", error: err.message });
  }
});

/* ======================
   NEWS
====================== */

// GET all news
router.get("/news", authMiddleware, isAdmin, async (req, res) => {
  try {
    const news = await News.findAll({ order: [["createdAt", "DESC"]] });
    res.json(news);
  } catch (err) {
    console.error("GET /api/admin/news error:", err);
    res.status(500).json({ message: "Failed to fetch news", error: err.message });
  }
});

// ADD news
router.post("/news", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { title, category, content } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!category || !category.trim()) {
      return res.status(400).json({ message: "Category is required" });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Content is required" });
    }

    // Generate slug if not provided
    const slug = req.body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    // Generate excerpt if not provided
    const excerpt = req.body.excerpt || content.slice(0, 150) + "...";

    const news = await News.create({
      ...req.body,
      slug,
      excerpt
    });
    res.status(201).json(news);
  } catch (err) {
    console.error("POST /api/admin/news error:", err);
    res.status(500).json({ message: "Failed to add news", error: err.message });
  }
});

// UPDATE news
router.put("/news/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    await News.update(req.body, { where: { id: req.params.id } });
    const updatedNews = await News.findByPk(req.params.id);
    res.json(updatedNews);
  } catch (err) {
    console.error("PUT /api/admin/news/:id error:", err);
    res.status(500).json({ message: "Failed to update news", error: err.message });
  }
});

// DELETE news
router.delete("/news/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    await News.destroy({ where: { id: req.params.id } });
    res.json({ message: "News deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/admin/news/:id error:", err);
    res.status(500).json({ message: "Failed to delete news", error: err.message });
  }
});

/* ======================
   RATINGS (dari Comment model)
====================== */

// GET all ratings with stats
router.get("/ratings", authMiddleware, isAdmin, async (req, res) => {
  try {
    const ratings = await Comment.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'email']
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    // Calculate stats
    const totalRatings = ratings.length;
    const avgRating = totalRatings > 0
      ? (ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings).toFixed(1)
      : 0;

    // Rating distribution
    const distribution = {
      1: ratings.filter(r => r.rating === 1).length,
      2: ratings.filter(r => r.rating === 2).length,
      3: ratings.filter(r => r.rating === 3).length,
      4: ratings.filter(r => r.rating === 4).length,
      5: ratings.filter(r => r.rating === 5).length,
    };

    // Top rated songs
    const songRatings = {};
    ratings.forEach(r => {
      const key = `${r.title} - ${r.artist}`;
      if (!songRatings[key]) {
        songRatings[key] = { title: r.title, artist: r.artist, ratings: [], count: 0 };
      }
      songRatings[key].ratings.push(r.rating);
      songRatings[key].count++;
    });

    const topRatedSongs = Object.values(songRatings)
      .map(s => ({
        ...s,
        avgRating: (s.ratings.reduce((a, b) => a + b, 0) / s.count).toFixed(1)
      }))
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 10);

    res.json({
      ratings,
      stats: {
        totalRatings,
        avgRating,
        distribution,
        topRatedSongs
      }
    });
  } catch (err) {
    console.error("GET /api/admin/ratings error:", err);
    res.status(500).json({ message: "Failed to fetch ratings", error: err.message });
  }
});

// DELETE rating
router.delete("/ratings/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const rating = await Comment.findByPk(req.params.id);
    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }
    await Comment.destroy({ where: { id: req.params.id } });
    res.json({ message: "Rating deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/admin/ratings/:id error:", err);
    res.status(500).json({ message: "Failed to delete rating", error: err.message });
  }
});

module.exports = router;
