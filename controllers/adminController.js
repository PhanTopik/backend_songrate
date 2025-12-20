const Song = require("../models/Song");
const Artist = require("../models/Artist");
const user = require("../models/user");
const News = require("../models/News");


// ➕ tambah lagu
exports.addSong = async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json({ message: "Song added successfully", song });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add song", error: err.message });
  }
};

// ✏️ edit lagu
exports.updateSong = async (req, res) => {
  try {
    const { id } = req.params;
    await Song.update(req.body, { where: { id } });
    res.json({ message: "Song updated successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to update song", error: err.message });
  }
};

// ❌ hapus lagu
exports.deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    await Song.destroy({ where: { id } });
    res.json({ message: "Song deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to delete song", error: err.message });
  }
};

// ========== ARTIST MANAGEMENT ==========

// ➕ tambah artis
exports.addArtist = async (req, res) => {
  try {
    const artist = await Artist.create(req.body);
    res.status(201).json({ message: "Artist added successfully", artist });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to add artist", error: err.message });
  }
};

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.findAll({ order: [["createdAt", "DESC"]] });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addNews = async (req, res) => {
  try {
    const news = await News.create(req.body);
    res.status(201).json(news);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });

    await news.update(req.body);
    res.json(news);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });

    await news.destroy();
    res.json({ message: "News deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✏️ edit artis
exports.updateArtist = async (req, res) => {
  try {
    const { id } = req.params;
    await Artist.update(req.body, { where: { id } });
    const artist = await Artist.findByPk(id);
    res.json({ message: "Artist updated successfully", artist });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to update artist", error: err.message });
  }
};

// ❌ hapus artis
exports.deleteArtist = async (req, res) => {
  try {
    const { id } = req.params;
    await Artist.destroy({ where: { id } });
    res.json({ message: "Artist deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to delete artist", error: err.message });
  }
};

// 👀 lihat semua artis
exports.getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.findAll();
    res.json({ message: "Artists retrieved successfully", artists });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to fetch artists", error: err.message });
  }
};

// 👀 lihat semua user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      attributes: ["id", "username", "email", "role"],
    });
    res.json({ message: "Users retrieved successfully", users });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: err.message });
  }
};
