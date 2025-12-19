# SongRate - Project Structure

## 📁 Folder Organization

```
D:\
├── backend_songrate/          (Backend - Node.js/Express)
│   ├── app.js
│   ├── index.js
│   ├── package.json
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── adminController.js
│   │   └── reviewsController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── isAdmin.js
│   ├── models/
│   │   ├── user.js
│   │   ├── Song.js
│   │   └── comment.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── adminRoutes.js
│   │   └── reviews.js
│   └── services/
│       └── addcomments.js
│
└── frontend_songrate/         (Frontend - React + Vite)
    ├── package.json
    ├── vite.config.js
    ├── index.html
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── components/
    │       ├── AdminDashboard.jsx
    │       └── AdminDashboard.css
    └── node_modules/
```

---

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd D:\backend_songrate
npm install
npm start
# Server running on http://localhost:5000
```

### 2. Frontend Setup
```bash
cd D:\frontend_songrate
npm install
npm run dev
# Frontend running on http://localhost:5173
```

---

## 📋 Backend Features

✅ User Authentication (Signup/Login)  
✅ JWT Token Management  
✅ Admin Role Check  
✅ Song CRUD Operations  
✅ User Management  
✅ Database Integration (PostgreSQL via Sequelize)  

### Key Endpoints
- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login user (returns redirectUrl)
- `GET /api/admin/dashboard` - Admin dashboard
- `GET /api/admin/users` - Get all users
- `POST /api/admin/songs` - Add song (admin only)
- `PUT /api/admin/songs/:id` - Update song (admin only)
- `DELETE /api/admin/songs/:id` - Delete song (admin only)

---

## 🎨 Frontend Features

✅ React + Vite  
✅ React Router for navigation  
✅ Admin Dashboard component  
✅ Responsive design  
✅ Modern UI with gradient styling  

### Key Routes
- `/` - Redirect to admin
- `/admin` - Admin dashboard (manage songs & view users)

---

## 🔄 Communication Flow

```
Frontend (http://localhost:5173)
    ↓
    └─→ API calls to Backend (http://localhost:5000/api)
        ├─ Login → Get token + redirectUrl
        ├─ Fetch Songs → Display in table
        ├─ Add/Edit/Delete Songs → Admin operations
        └─ Fetch Users → Display all registered users
```

---

## 🔐 Authentication Flow

1. **User Login** → POST `/api/auth/login`
2. **Get Response** → { token, user, redirectUrl }
3. **Store Token** → localStorage.setItem('token', token)
4. **Redirect** → Use redirectUrl from response
   - Admin → `/admin` (AdminDashboard)
   - User → `/dashboard`
5. **Protected Routes** → Use token in Authorization header

---

## 📝 Environment Variables

### Backend (.env)
```
JWT_SECRET=rahasia_super_aman_123
DATABASE_URL=postgres://user:password@localhost:5432/songrate
PORT=5000
```

### Frontend (.env.local)
```
VITE_API_BASE=http://localhost:5000/api
```

---

## 📦 Dependencies

### Backend
- express
- sequelize
- pg (PostgreSQL)
- bcryptjs (password hashing)
- jsonwebtoken (JWT)
- cors
- dotenv

### Frontend
- react
- react-dom
- react-router-dom
- vite

---

## ✅ Verification Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Database connected
- [ ] CORS configured correctly
- [ ] JWT token working
- [ ] Admin login redirects to /admin
- [ ] AdminDashboard loads songs and users
- [ ] Can add/edit/delete songs
- [ ] Can view all users

---

## 🔧 Troubleshooting

### Backend won't start
```bash
# Check port 5000 is not in use
netstat -ano | findstr :5000
# Install dependencies
npm install
```

### Frontend won't load
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
npm run dev
```

### API calls failing
- Check backend is running
- Verify CORS origin in backend
- Check token in localStorage
- Verify API_BASE URL matches backend

---

## 📄 Next Steps

1. Add more authentication features (email verification, password reset)
2. Add more user roles and permissions
3. Implement review/rating system
4. Add search and filter functionality
5. Deploy to production

---

Enjoy! 🎉
