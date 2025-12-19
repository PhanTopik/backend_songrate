# 🔴 "Failed to fetch" - Troubleshooting Guide

## 🚨 Penyebab Umum Error

1. **Backend tidak running**
2. **Port yang salah** (backend di port 3000, frontend expect 5000)
3. **CORS tidak dikonfigurasi**
4. **URL API salah**
5. **Token expired/invalid**
6. **Endpoint tidak exist**

---

## ✅ Checklist Debugging

### 1️⃣ Pastikan Backend Running

```bash
cd D:\backend_songrate
npm start
```

**Output yang benar:**
```
🚀 Server started on port 5000
```

**Jika error di npm install:**
```bash
npm install
npm start
```

---

### 2️⃣ Verifikasi Port Backend

**Check port yang digunakan:**
```powershell
netstat -ano | findstr :5000
```

**Jika port 5000 sudah digunakan, change PORT di index.js:**
```javascript
const PORT = process.env.PORT || 5000;  // Ubah dari 3000 ke 5000
```

---

### 3️⃣ Cek API Base URL di Frontend

**File: `frontend_songrate/src/components/AdminDashboard.jsx`**

Line 30 harus benar:
```javascript
const API_BASE = "http://localhost:5000/api";
```

**Jika backend di port berbeda, ubah ke:**
```javascript
const API_BASE = "http://localhost:YOUR_PORT/api";
```

---

### 4️⃣ Test API dengan Browser

Buka di browser:
```
http://localhost:5000/
```

**Jika berhasil, akan muncul:**
```
API SongRATE Running...
```

---

### 5️⃣ Check Network Tab di Browser

1. Buka **DevTools** (F12)
2. Pilih tab **Network**
3. Coba trigger request (login/fetch songs)
4. Lihat response dari API

**Status error?**
- 401 = Token invalid
- 403 = Admin only
- 404 = Endpoint tidak ada
- 500 = Backend error
- CORS error = Check CORS config

---

### 6️⃣ Check Browser Console untuk Error Details

1. Buka **DevTools** (F12)
2. Pilih tab **Console**
3. Lihat error message detil

**Contoh error:**
```
Failed to fetch: CORS policy error
Failed to fetch: Network error
TypeError: Cannot read properties of undefined
```

---

## 🔧 Setup Langkah-demi-Langkah

### **Step 1: Buka Terminal 1 (Backend)**
```bash
cd D:\backend_songrate
npm install
npm start
```

**Tunggu sampai muncul:**
```
🚀 Server started on port 5000
```

---

### **Step 2: Buka Terminal 2 (Frontend)**
```bash
cd D:\frontend_songrate
npm install
npm run dev
```

**Tunggu sampai muncul:**
```
VITE v5.0.8  ready in 123 ms

➜  Local:   http://localhost:5173/
```

---

### **Step 3: Test di Browser**

1. Buka http://localhost:5173
2. Lihat apakah AdminDashboard muncul
3. Buka DevTools (F12) → Console
4. Lihat ada error apa

---

## 🔍 Common Error Solutions

### **Error: "CORS policy error"**

**Penyebab:** Frontend URL tidak di whitelist backend

**Solusi di `app.js`:**
```javascript
app.use(
  cors({
    origin: ["http://localhost:5173", "https://songrate.vercel.app"],
    credentials: true,
  })
);
```

✅ Pastikan `http://localhost:5173` ada di list

---

### **Error: "Token invalid"**

**Penyebab:** JWT_SECRET tidak match atau token expired

**Solusi:**
1. Check localStorage token valid: `localStorage.getItem('token')`
2. Verify JWT_SECRET di backend sama: `rahasia_super_aman_123`
3. Token expire time 1 hour, login ulang jika sudah expired

**Di AdminDashboard.jsx, tambah:**
```javascript
// Debug: check token
console.log('Token:', localStorage.getItem('token'));
```

---

### **Error: "Endpoint tidak ada" (404)**

**Penyebab:** Route tidak terdaftar atau typo URL

**Check di backend apakah routes ini exist:**
```
✅ POST /api/auth/login
✅ POST /api/auth/signup
✅ GET /api/admin/dashboard
✅ GET /api/admin/users
✅ POST /api/admin/songs
✅ PUT /api/admin/songs/:id
✅ DELETE /api/admin/songs/:id
✅ GET /api/reviews
```

**Jika missing, check file `routes/adminRoutes.js` ada apa**

---

### **Error: "Cannot read properties"**

**Penyebab:** Response data structure tidak sesuai

**Check console dan lihat actual response:**
```javascript
.then(res => {
  console.log('Response:', res);
  return res.json();
})
.then(data => {
  console.log('Data:', data);
})
```

---

## 📋 Quick Checklist

```
☐ Backend running di port 5000
☐ Frontend running di port 5173
☐ Database connected
☐ CORS configured untuk http://localhost:5173
☐ Token valid dan tidak expired
☐ API_BASE URL benar
☐ Endpoint exist dan working
☐ No typo di URL path
☐ Request method benar (GET/POST/PUT/DELETE)
```

---

## 🚀 Restart Everything Fresh

**Jika masih error, coba fresh start:**

### Terminal 1:
```bash
cd D:\backend_songrate
npm install
npm start
```

### Terminal 2:
```bash
cd D:\frontend_songrate
npm install
npm run dev
```

### Browser:
```
http://localhost:5173
```

**Open DevTools (F12) → Check Console untuk error details**

---

## 📞 Debug Steps Jika Masih Error

1. **Screenshot DevTools Console**
2. **Check network tab** untuk response dari API
3. **Verify semua ports** berjalan benar
4. **Cek backend logs** di terminal
5. **Verify database** connected

---

Jika error masih muncul, beri tahu:
- Apa error message tepatnya
- Port berapa backend running
- Screenshot DevTools Console
- Screenshot Network tab

Saya bisa bantu solve! 🎯
