const express = require("express");
const router = express.Router();
const News = require("../models/News");

// 🔹 GET semua news (PUBLIC)
router.get("/", async (req, res) => {
  try {
    let news;
    try {
      // Try with createdAt first
      news = await News.findAll({
        order: [["createdAt", "DESC"]],
      });
    } catch (orderErr) {
      // Fallback: try with created_at
      console.log("Trying with created_at ordering");
      news = await News.findAll({
        order: [["created_at", "DESC"]],
      });
    }
    res.json(news);
  } catch (err) {
    console.error("GET /api/news error:", err);
    res.status(500).json({ message: "Failed to fetch news", error: err.message });
  }
});

// 🔹 GET news by slug (PUBLIC)
router.get("/:slug", async (req, res) => {
  try {
    const news = await News.findOne({
      where: { slug: req.params.slug },
    });

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    res.json(news);
  } catch (err) {
    console.error("GET /api/news/:slug error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
