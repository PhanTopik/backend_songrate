const ReviewService = require('../services/addcomments');

const getAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewService.getAllReviews();
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error getting reviews:", error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

const addReview = async (req, res) => {
  try {
    console.log("Menerima Data Review:", req.body);

    const { userId, title, artist, rating, message } = req.body;
    
    // Validasi input
    if (!userId || !title || !artist || !rating) {
      console.error("Validation Error: Missing fields");
      return res.status(400).json({ error: 'UserId, Title, Artist, and Rating are required.' });
    }

    const data = { title, artist, rating, message };
    
    // Panggil service
    const newReview = await ReviewService.addReview(userId, data);

    res.status(201).json({ message: 'Review added successfully', data: newReview });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

module.exports = {
  getAllReviews,
  addReview
};