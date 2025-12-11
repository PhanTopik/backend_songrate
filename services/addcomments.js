const { Comment } = require('../models/comment'); 
const { User } = require('../models/user');

const getAllReviews = async () => {
  return await Comment.findAll({
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ],
    order: [['createdAt', 'DESC']]
  });
};

const addReview = async (userId, data) => {
  const { title, artist, rating, message } = data;
  
  const newReview = await Comment.create({
    userId: userId,
    title,
    artist,
    rating,
    message
  });

  return newReview;
};

module.exports = {
  getAllReviews,
  addReview
};