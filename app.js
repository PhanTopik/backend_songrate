const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

// Routes
const reviewRoutes = require("./routes/reviews");
const authRoutes = require("./routes/auth");

const app = express();

// --- Connect to database ---
connectDB();

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:5173", "https://songrate.vercel.app"],
    credentials: true,
  })
);

app.options("*", cors());

// --- Routes ---
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// --- Health check / default route ---
app.get("/", (req, res) => {
  res.send("API SongRATE Running...");
});

// --- 404 Handler ---
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// --- Error handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
