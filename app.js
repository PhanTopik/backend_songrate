const express = require("express");
const cors = require("cors");

const reviewRoutes = require("./routes/reviews");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/adminRoutes");
const songRoutes = require("./routes/songRoutes");
const userRoutes = require("./routes/userRoutes");
const newsRoutes = require("./routes/newsRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: true, // Allow all origins
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/users", userRoutes);
app.use("/api/news", newsRoutes);

app.get("/", (req, res) => {
  res.send("API SongRATE Running...");
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
