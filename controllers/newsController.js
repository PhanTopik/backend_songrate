const News = require("../models/News");

// ==========================
// CREATE NEWS (ADMIN)
// ==========================
exports.createNews = async (req, res) => {
  try {
    const {
      title,
      slug,
      category,
      excerpt,
      content,
      image,
      isFeatured,
      status,
    } = req.body;

    // Validasi wajib
    if (!title || !slug || !category || !excerpt || !content) {
      return res.status(400).json({
        message: "Title, slug, category, excerpt, and content are required",
      });
    }

    // Cek slug unik
    const existing = await News.findOne({ where: { slug } });
    if (existing) {
      return res.status(409).json({ message: "Slug already exists" });
    }

    const news = await News.create({
      title,
      slug,
      category,
      excerpt,
      content,
      image,
      isFeatured,
      status,
    });

    res.status(201).json({
      message: "News created successfully",
      data: news,
    });
  } catch (error) {
    console.error("CREATE NEWS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// GET ALL NEWS (PUBLIC)
// ==========================
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(news);
  } catch (error) {
    console.error("GET ALL NEWS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// GET NEWS BY SLUG (PUBLIC)
// ==========================
exports.getNewsBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const news = await News.findOne({ where: { slug } });

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    res.json(news);
  } catch (error) {
    console.error("GET NEWS BY SLUG ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// UPDATE NEWS (ADMIN)
// ==========================
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    // Kalau slug diubah → cek unik
    if (req.body.slug && req.body.slug !== news.slug) {
      const slugExists = await News.findOne({
        where: { slug: req.body.slug },
      });

      if (slugExists) {
        return res.status(409).json({ message: "Slug already exists" });
      }
    }

    await news.update(req.body);

    res.json({
      message: "News updated successfully",
      data: news,
    });
  } catch (error) {
    console.error("UPDATE NEWS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// DELETE NEWS (ADMIN)
// ==========================
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    await news.destroy();

    res.json({ message: "News deleted successfully" });
  } catch (error) {
    console.error("DELETE NEWS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
