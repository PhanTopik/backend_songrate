const EventsService = require('../services');

const getAllEvents = async (req, res) => {
  try {
    // Logika untuk mendapatkan semua event
    const events = await EventsService.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error fetching all events' });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    // Logika untuk mendapatkan event berdasarkan ID
    const event = await EventsService.getEventById(id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error fetching event by ID' });
  }
};

const createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    // Logika untuk membuat event baru
    const newEvent = await EventsService.createEvent(eventData);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error creating event' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    // Logika untuk memperbarui event
    const updated = await EventsService.updateEvent(id, updateData);
    if (updated) {
      res.status(200).json({ message: 'Event updated successfully', data: updated });
    } else {
      res.status(404).json({ error: 'Event not found or failed to update' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error updating event' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    // Logika untuk menghapus event
    const deleted = await EventsService.deleteEvent(id);
    if (deleted) {
      res.status(204).send(); 
    } else {
      res.status(404).json({ error: 'Event not found or failed to delete' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error deleting event' });
  }
};


const addComment = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { userId, commentText } = req.body; 
    
    // Validasi dasar
    if (!userId || !commentText) {
      return res.status(400).json({ error: 'UserID and commentText are required.' });
    }

    const updatedEvent = await EventsService.addCommentToEvent(eventId, userId, commentText);

    if (updatedEvent) {
      res.status(201).json({ message: 'Comment added successfully', data: updatedEvent });
    } else {
      res.status(404).json({ error: 'Event not found or failed to add comment' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Pastikan semua fungsi yang diimpor di routes/events.js diekspor di sini
module.exports = {
  getAllEvents, 
  getEventById, 
  createEvent,  
  updateEvent,  
  deleteEvent,  
  addComment,
};