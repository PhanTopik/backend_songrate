const Event = require('../models/event');

const eventsService = {
  getAllEvents: async () => {
    return await Event.findAll();
  },
  getEventById: async (id) => {
    return await Event.findByPk(id); 
  },
  createEvent: async (eventData) => {
    return await Event.create(eventData);
  },
  updateEvent: async (id, eventData) => {
    await Event.update(eventData, {
      where: { id: id }
    });
    return await Event.findByPk(id);
  },
  deleteEvent: async (id) => {
    const result = await Event.destroy({
      where: { id: id }
    });
    return result > 0; 
  },
};

module.exports = eventsService;