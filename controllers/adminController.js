const Song = require("../models/Song");
const User = require("../models/User");

// ➕ tambah lagu
exports.addSong = async (req, res) => {
  const song = await Song.create(req.body);
  res.status(201).json(song);
};

// ✏️ edit lagu
exports.updateSong = async (req, res) => {
  const { id } = req.params;
  await Song.update(req.body, { where: { id } });
  res.json({ message: "Song updated" });
};

// ❌ hapus lagu
exports.deleteSong = async (req, res) => {
  const { id } = req.params;
  await Song.destroy({ where: { id } });
  res.json({ message: "Song deleted" });
};

// 👀 lihat semua user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "role"],
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
