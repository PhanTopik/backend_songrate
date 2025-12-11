const Comment = require('../models/coment');
const User = require('../models/user');

const getAllReviews = async () => {
  try {
    return await Comment.findAll({
        order: [['created_at', 'DESC']]
    });
  } catch (error) {
    throw error;
  }
};

const addReview = async (userId, reviewData) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error("User not found. Please login.");
    }

    const newReview = await Comment.create({
        user_id: user.id,
        username: user.username,
        title: reviewData.title,
        artist: reviewData.artist,
        rating: reviewData.rating,
        message: reviewData.message
    });

    return newReview;

  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

module.exports = {
  getAllReviews,
  addReview
};