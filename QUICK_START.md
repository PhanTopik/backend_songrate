# 🚀 Quick Start Guide

## 📋 Requirements
- Node.js & npm installed
- PostgreSQL running (or check database connection)
- Port 5000 & 5173 available

---

## 🔥 Start Backend (Terminal 1)

```bash
cd D:\backend_songrate
npm install
npm start
```

**Expected Output:**
```
🚀 Server started on port 5000
📡 API Base: http://localhost:5000/api
🌐 Frontend origin: http://localhost:5173
```

---

## 🎨 Start Frontend (Terminal 2)

```bash
cd D:\frontend_songrate
npm install
npm run dev
```

**Expected Output:**
```
VITE v5.0.8  ready in 123 ms

➜  Local:   http://localhost:5173/
```

---

## ✅ Test Backend API

### Option 1: PowerShell Test
```powershell
cd D:\backend_songrate
powershell -ExecutionPolicy Bypass -File test-api.ps1
```

### Option 2: Browser Test
Open in browser:
- `http://localhost:5000/` - Check if backend running
- `http://localhost:5173/` - Frontend admin dashboard

---

## 🔐 Login for Admin

**Create admin account first:**
1. Backend must be running
2. Use `test-api.ps1` to create test account
3. Or create manually via frontend signup

**Default test account after running test-api.ps1:**
```
Email: admin@test.com
Password: password123
```

---

## 🐛 Troubleshooting "Failed to fetch"

### Check 1: Backend Running
```bash
# In backend terminal, should show:
🚀 Server started on port 5000
```

### Check 2: Port 5000 Available
```powershell
# Check if port is in use
netstat -ano | findstr :5000
```

### Check 3: Browser DevTools
1. Open http://localhost:5173
2. Press F12 (DevTools)
3. Check **Console** tab for errors
4. Check **Network** tab for API calls

### Check 4: API Response
Open in browser: `http://localhost:5000/`
- ✅ Should show: "API SongRATE Running..."
- ❌ If error, backend not running

---

## 📱 Features

### Admin Dashboard (http://localhost:5173)
- ✅ Add Song
- ✅ Edit Song
- ✅ Delete Song
- ✅ View All Users

### Required for Login
- Valid JWT token
- Role = "admin"

---

## 📁 Project Structure

```
D:\backend_songrate\     ← Node.js Backend (Port 5000)
  ├── index.js           ← Server entry (PORT 5000)
  ├── app.js             ← Express app
  ├── routes/            ← API routes
  ├── controllers/       ← Business logic
  ├── middleware/        ← Auth & admin check
  ├── models/            ← Database models
  └── test-api.ps1       ← Test script

D:\frontend_songrate\    ← React Frontend (Port 5173)
  ├── src/
  │   ├── components/
  │   │   └── AdminDashboard.jsx
  │   ├── App.jsx
  │   └── main.jsx
  └── vite.config.js
```

---

## 🔧 If Still Error

1. **Kill running process:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill it (PID is in last column)
taskkill /PID <PID> /F
```

2. **Fresh npm install:**
```bash
cd D:\backend_songrate
rm -r node_modules package-lock.json
npm install
npm start
```

3. **Check database:**
- Is PostgreSQL running?
- Database connection working?
- Check console for DB errors

---

## 📞 Debug Info to Share

If issue persists, provide:
1. Backend terminal output
2. Frontend terminal output
3. Browser DevTools Console screenshot
4. Browser DevTools Network tab screenshot
5. netstat command output (to check ports)

---

## ✨ You're All Set!

Backend: http://localhost:5000/api  
Frontend: http://localhost:5173  
Admin Dashboard: http://localhost:5173/admin  

Happy coding! 🎉
