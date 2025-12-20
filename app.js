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
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:5174",
        process.env.FRONTEND_URL || "https://localhost:5173",
      ];

      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, true); // Allow all for now
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Add headers middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

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
