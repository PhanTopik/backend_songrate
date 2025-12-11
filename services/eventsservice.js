const { v4: uuidv4 } = require('uuid');
const Event = require('../models/event');

const getAllEvents = async () => {
  try {
    return await Event.findAll();
  } catch (error) {
    throw error;
  }
};

const getEventById = async (id) => {
  try {
    return await Event.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const createEvent = async (data) => {
  try {
    // Generate UUID jika database tidak auto-increment atau untuk memastikan ID unik
    const newEventData = {
      ...data,
      id: data.id || uuidv4() 
    };
    return await Event.create(newEventData);
  } catch (error) {
    throw error;
  }
};

const updateEvent = async (id, data) => {
  try {
    const event = await Event.findByPk(id);
    if (!event) return null;
    
    await event.update(data);
    return event;
  } catch (error) {
    throw error;
  }
};

const deleteEvent = async (id) => {
  try {
    const event = await Event.findByPk(id);
    if (!event) return false;

    await event.destroy();
    return true;
  } catch (error) {
    throw error;
  }
};

const addCommentToEvent = async (eventId, userId, commentText) => {
  try {
    const event = await Event.findByPk(eventId);

    if (!event) {
      return null;
    }

    const newComment = {
      id: uuidv4(),
      userId,
      commentText,
      timestamp: new Date()
    };
    
    // Pastikan comments adalah array (terutama untuk SQLite/JSON field)
    let currentComments = event.comments;
    if (typeof currentComments === 'string') {
        try {
            currentComments = JSON.parse(currentComments);
        } catch (e) {
            currentComments = [];
        }
    }
    if (!Array.isArray(currentComments)) {
      currentComments = [];
    }

    currentComments.push(newComment);
    
    // Update properti dan simpan
    event.comments = currentComments;
    
    // Gunakan 'update' untuk memicu setter/getter jika perlu, atau save()
    // Di sini kita update field comments secara eksplisit agar Sequelize mendeteksi perubahan pada kolom JSON
    await Event.update({ comments: currentComments }, { where: { id: eventId } });

    // Refresh instance untuk mendapatkan data terbaru
    return await event.reload();

  } catch (error) {
    console.error('Error adding comment to event:', error);
    throw error;
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  addCommentToEvent,
};