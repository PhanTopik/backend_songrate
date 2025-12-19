const Song = require("../models/Song");
const user = require("../models/user");

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
