const { v4: uuidv4 } = require('uuid');
const Event = require('../models/coment');
const User = require('../models/user'); // <--- TAMBAHAN 1: Import Model User

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
    // 1. Cek apakah Event yang dikomentari ada
    const event = await Event.findByPk(eventId);
    if (!event) {
      return null;
    }

    // 2. Cek apakah User ada di Database (Integrasi dengan Tabel Akun)
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error("User ID not found in database. Please login first.");
    }

    // 3. Buat Komentar (Sekarang menyertakan Username asli dari DB)
    const newComment = {
      id: uuidv4(),
      userId: user.id,        // ID dari database
      username: user.username, // <--- FITUR BARU: Simpan nama user agar muncul di Frontend
      commentText,
      timestamp: new Date()
    };
    
    // Logika penanganan array JSON (Sequelize/SQLite)
    let currentComments = event.comments;
    
    // Parsing aman jika formatnya string (terkadang terjadi di SQLite versi lama)
    if (typeof currentComments === 'string') {
        try {
            currentComments = JSON.parse(currentComments);
        } catch (e) {
            currentComments = [];
        }
    }
    
    // Pastikan array
    if (!Array.isArray(currentComments)) {
      currentComments = [];
    }

    // Masukkan komentar baru
    currentComments.push(newComment);
    
    // Update ke database
    // Kita gunakan method update secara eksplisit untuk memaksa perubahan pada kolom JSON
    await Event.update(
        { comments: currentComments }, 
        { where: { id: eventId } }
    );

    // Refresh data event untuk dikembalikan ke frontend
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