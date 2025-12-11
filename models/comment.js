const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
             model: 'Users',
             key: 'id'
        }
    },
    username: { 
        type: DataTypes.STRING,
        allowNull: true 
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
        validate: { min: 1, max: 5 }
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'comments',
    timestamps: true, 
    underscored: true
});

module.exports = Comment;