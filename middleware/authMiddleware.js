const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  // Mengambil token dengan memisahkan kata 'Bearer' dan kodenya secara benar
  const token = authHeader && authHeader.startsWith('Bearer ') 
                ? authHeader.split(' ')[1] 
                : null;

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    // Verifikasi menggunakan secret key yang konsisten
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'rahasia_super_aman_123');
    req.user = decoded;
    next();
  } catch (err) {
    // Jika token expired atau secret key beda, ini akan terpanggil
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = authMiddleware;