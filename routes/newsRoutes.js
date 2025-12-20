const express = require("express");
const router = express.Router();

const { createNews, getAllNews, getNewsBySlug } = require("../controllers/newsController");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");

// admin only
router.post("/", authMiddleware, isAdmin, createNews);

// public
router.get("/", getAllNews);
router.get("/:slug", getNewsBySlug);

module.exports = router;
