const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const News = sequelize.define(
  "News",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    excerpt: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    image: {
      type: DataTypes.TEXT,
    },

    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "published",
    },
  },
  {
    tableName: "News",
    timestamps: true,
  }
);

module.exports = News;
