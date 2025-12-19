const express = require("express");
const cors = require("cors");

const reviewRoutes = require("./routes/reviews");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:5173", "https://songrate.vercel.app"],
    credentials: true,
  })
);

app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("API SongRATE Running...");
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
