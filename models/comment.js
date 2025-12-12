const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user'); // Pastikan path ini benar ke model User Anda

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.STRING, // Sesuaikan dengan tipe ID di tabel User (STRING/UUID)
    allowNull: false,
    references: {
      model: User, 
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'comments' // Memastikan nama tabel konsisten di Postgres
});

// Setup Relasi (Penting untuk Include di Controller)
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Comment, { foreignKey: 'userId' });

module.exports = Comment;