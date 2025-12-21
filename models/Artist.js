const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Artist = sequelize.define(
  "Artist",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    genre: DataTypes.STRING,
    bio: DataTypes.TEXT,
    image: DataTypes.TEXT,
    followers: { type: DataTypes.INTEGER, defaultValue: 0 },
    verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: "Artists",
    timestamps: true,
  }
);

module.exports = Artist;
