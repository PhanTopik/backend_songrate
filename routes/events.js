const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  addComment
} = require('../controllers/eventsController');

const express = require('express');

const router = express.Router();

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

router.post('/:eventId/comment', addComment);

module.exports = router;