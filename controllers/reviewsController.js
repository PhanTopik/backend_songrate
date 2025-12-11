const ReviewService = require('../services/addcomments');

const getAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewService.getAllReviews();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

const addReview = async (req, res) => {
  try {
    const { userId, title, artist, rating, message } = req.body;
    
    if (!userId || !title || !artist || !rating) {
      return res.status(400).json({ error: 'UserId, Title, Artist, and Rating are required.' });
    }

    const data = { title, artist, rating, message };
    const newReview = await ReviewService.addReview(userId, data);

    res.status(201).json({ message: 'Review added successfully', data: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllReviews,
  addReview
};