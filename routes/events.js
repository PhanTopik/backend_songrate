const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

// @route   GET api/events
// @desc    Get all events
// @access  Public
router.get('/', eventsController.getEvents);

// @route   GET api/events/:id
// @desc    Get single event by ID
// @access  Public
router.get('/:id', eventsController.getEvent);

// @route   POST api/events
// @desc    Create an event
// @access  Public (bisa diubah menjadi private dengan autentikasi)
router.post('/', eventsController.createEvent);

// @route   PUT api/events/:id
// @desc    Update an event
// @access  Public (bisa diubah menjadi private dengan autentikasi)
router.put('/:id', eventsController.updateEvent);

// @route   DELETE api/events/:id
// @desc    Delete an event
// @access  Public (bisa diubah menjadi private dengan autentikasi)
router.delete('/:id', eventsController.deleteEvent);

module.exports = router;