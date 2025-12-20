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
    type: DataTypes.STRING,
    releaseDate: DataTypes.STRING,
    releaseYear: DataTypes.INTEGER,
    tracks: DataTypes.INTEGER,
    duration: DataTypes.STRING,
    image: DataTypes.TEXT,
    description: DataTypes.TEXT,
    highlight: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: DataTypes.STRING,
  },
  {
    tableName: "Songs",
    timestamps: true,   // ⬅️ INI WAJIB
  }
);

module.exports = Song;
