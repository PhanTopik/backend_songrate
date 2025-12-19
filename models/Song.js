const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Song = sequelize.define("Song", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: DataTypes.STRING,
  artist: DataTypes.STRING,
  genre: DataTypes.STRING,
  releaseYear: DataTypes.INTEGER
}, {
  tableName: "Songs"
});

module.exports = Song;
