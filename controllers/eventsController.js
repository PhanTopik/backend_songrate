const eventsService = require('../services/eventsservice');

const eventsController = {
getEvents: async (req, res) => {
    try {
      const events = await eventsService.getAllEvents();
      res.json(events);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  getEvent: async (req, res) => {
    try {
      const event = await eventsService.getEventById(req.params.id);
      if (!event) {
        return res.status(404).json({ msg: 'Event not found' });
      }
      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  createEvent: async (req, res) => {
    try {
      const newEvent = await eventsService.createEvent(req.body);
      res.status(201).json(newEvent);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  updateEvent: async (req, res) => {
    try {
      const updatedEvent = await eventsService.updateEvent(req.params.id, req.body);
      if (!updatedEvent) {
        return res.status(404).json({ msg: 'Event not found' });
      }
      res.json(updatedEvent);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  deleteEvent: async (req, res) => {
    try {
      const isDeleted = await eventsService.deleteEvent(req.params.id);
      if (!isDeleted) {
        return res.status(404).json({ msg: 'Event not found' });
      }
      res.status(204).send(); 
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = eventsController;