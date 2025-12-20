const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Song = sequelize.define(
  "Song",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    artist: { type: DataTypes.STRING, allowNull: false },
    genre: DataTypes.STRING,
    type: DataTypes.STRING, // album | single | ep
    releaseDate: DataTypes.STRING, // human-friendly date (e.g. "April 19, 2024")
    releaseYear: DataTypes.INTEGER,
    tracks: DataTypes.INTEGER,
    duration: DataTypes.STRING,
    image: DataTypes.TEXT,
    description: DataTypes.TEXT,
    highlight: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: DataTypes.STRING, // e.g. "confirmed", "rumored", "highlyAnticipated"
  },
  {
    tableName: "Songs",
  }
);

module.exports = Song;
