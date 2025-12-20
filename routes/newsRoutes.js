const express = require("express");
const router = express.Router();

const {
  createNews,
  getAllNews,
  getNewsBySlug,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");

const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");

// ==================
// PUBLIC ROUTES
// ==================
router.get("/", getAllNews);
router.get("/:slug", getNewsBySlug);

// ==================
// ADMIN ROUTES
// ==================
router.post("/", authMiddleware, isAdmin, createNews);
router.put("/:id", authMiddleware, isAdmin, updateNews);
router.delete("/:id", authMiddleware, isAdmin, deleteNews);

module.exports = router;
