const express = require("express");
const cors = require("cors");

// Routes
const reviewRoutes = require("./routes/reviews");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

const app = express();

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:5173", "https://songrate.vercel.app"],
    credentials: true,
  })
);

// --- Routes ---
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// --- Health check ---
app.get("/", (req, res) => {
  res.send("API SongRATE Running...");
});

// --- 404 ---
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
