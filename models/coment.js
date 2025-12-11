// models/comment.js

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        event_id: { // Foreign Key baru untuk menghubungkan ke Event
            type: DataTypes.INTEGER,
            allowNull: true // Bisa disetel ke false jika setiap comment HARUS punya event
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        album: {
            type: DataTypes.TEXT
        },
        artist: {
            type: DataTypes.TEXT
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT
        }
        // created_at akan ditangani oleh timestamps: true
    }, {
        tableName: 'comments',
        timestamps: true,
        underscored: true // Penting agar created_at menjadi created_at, bukan createdAt
    });

    // Mendefinisikan Asosiasi
    Comment.associate = function(models) {
        // Comment memiliki hubungan belongsTo (milik) ke satu Event
        Comment.belongsTo(models.Event, {
            foreignKey: 'event_id', // Menunjuk ke kolom Foreign Key di tabel comments
            as: 'event'
        });
    };

    return Comment;
};