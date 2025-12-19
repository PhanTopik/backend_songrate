# AdminDashboard Component - Integration Guide

## 📋 Overview

AdminDashboard adalah komponen React yang menyediakan interface lengkap untuk admin mengelola lagu dan melihat semua user.

### Fitur-Fitur:

✅ **Tambah Lagu** - Form untuk menambah lagu baru  
✅ **Edit Lagu** - Edit data lagu yang sudah ada  
✅ **Hapus Lagu** - Hapus lagu dari database  
✅ **Lihat User** - Table lengkap semua user terdaftar

---

## 🚀 Installation & Setup

### 1. Copy Files ke Project React

Salin kedua file ke folder `src/components/`:

```
src/
├── components/
│   ├── AdminDashboard.jsx
│   └── AdminDashboard.css
```

### 2. Setup React Router

Di `App.jsx` atau routing file:

```jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* ... other routes ... */}
        <Route path="/admin" element={<AdminDashboard />} />
        {/* Protect route dengan auth check */}
        <Route
          path="/admin"
          element={
            isAdminUser() ? <AdminDashboard /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}
```

### 3. Update Login Handler

Di component login Anda, gunakan `redirectUrl` dari response:

```jsx
const handleLogin = async (email, password) => {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    // Simpan token dan user info
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // GUNAKAN REDIRECT URL DARI RESPONSE
    window.location.href = data.redirectUrl; // "/admin" atau "/dashboard"
  }
};
```

### 4. Helper Function untuk Check Admin

```javascript
// utils/authUtils.js
export const isAdminUser = () => {
  const user = localStorage.getItem("user");
  if (!user) return false;

  try {
    const userData = JSON.parse(user);
    return userData.role === "admin";
  } catch {
    return false;
  }
};

export const getToken = () => {
  return localStorage.getItem("token");
};
```

---

## 🎨 Component Usage

### Simple Usage

```jsx
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return <AdminDashboard />;
}
```

### With Auth Protection

```jsx
import AdminDashboard from "./components/AdminDashboard";
import { isAdminUser } from "./utils/authUtils";

function App() {
  if (!isAdminUser()) {
    return <Navigate to="/login" />;
  }

  return <AdminDashboard />;
}
```

---

## 🔌 API Endpoints Used

Component ini menggunakan API endpoints berikut:

### 1. **Add Song**

```
POST /api/admin/songs
Headers: Authorization: Bearer {token}
Body: {
  "title": "string",
  "artist": "string",
  "genre": "string",
  "year": number
}
```

### 2. **Get Songs**

```
GET /api/reviews
Headers: Authorization: Bearer {token}
```

### 3. **Update Song**

```
PUT /api/admin/songs/{id}
Headers: Authorization: Bearer {token}
Body: {
  "title": "string",
  "artist": "string",
  "genre": "string",
  "year": number
}
```

### 4. **Delete Song**

```
DELETE /api/admin/songs/{id}
Headers: Authorization: Bearer {token}
```

### 5. **Get All Users**

```
GET /api/admin/users
Headers: Authorization: Bearer {token}
Response: {
  "message": "string",
  "users": [
    {
      "id": "uuid",
      "username": "string",
      "email": "string",
      "role": "admin|user"
    }
  ]
}
```

---

## 📝 State Management

Component menggunakan React Hooks untuk state:

```jsx
- songs []          // List semua lagu
- users []          // List semua user
- activeTab         // "songs" atau "users"
- formData {}       // Data form input
- isEditing bool    // Mode edit atau tambah
- loading bool      // Loading state
- error string      // Error message
- success string    // Success message
```

---

## 🎯 Features Detail

### Tab 1: Manage Songs

#### Form Inputs:

- **Title** - Judul lagu (required)
- **Artist** - Nama artist (required)
- **Genre** - Genre musik (required)
- **Year** - Tahun rilis (optional, default: current year)

#### Table Columns:

- Title
- Artist
- Genre
- Year
- Actions (Edit / Delete buttons)

#### Actions:

1. **Tambah Lagu** - Submit form untuk create lagu baru
2. **Edit Lagu** - Click tombol Edit di table → form populate data → submit untuk update
3. **Hapus Lagu** - Click Delete → confirm dialog → lagu terhapus
4. **Cancel** - Batalkan edit mode, reset form

### Tab 2: View Users

#### Table Columns:

- Username
- Email
- Role (badge dengan styling berbeda untuk admin/user)
- User ID (UUID)

#### Features:

- Read-only table untuk melihat semua registered users
- Role badge dengan warna berbeda (gold untuk admin, blue untuk user)
- Full UUID display untuk each user

---

## ✨ UI/UX Features

✅ **Loading States** - Disable buttons dan show loading text saat request  
✅ **Error Handling** - Display error messages dengan styling merah  
✅ **Success Messages** - Show success notification setelah action  
✅ **Responsive Design** - Mobile-friendly layout  
✅ **Form Validation** - Require fields untuk input  
✅ **Confirmation Dialog** - Ask confirmation sebelum delete  
✅ **Tab Navigation** - Easy switch antara manage songs dan view users  
✅ **Beautiful Styling** - Modern gradient design dengan smooth transitions

---

## 🔐 Security Notes

1. **Token Requirement** - Semua request require valid JWT token
2. **Admin Only** - Backend middleware check `role === 'admin'`
3. **Token Storage** - Token disimpan di localStorage (gunakan httpOnly cookies untuk production)
4. **CORS** - Backend CORS allow origin frontend URL

---

## 📱 Responsive Breakpoints

- **Desktop** (>768px): Full layout dengan grid form
- **Tablet** (768px): Adjusted spacing
- **Mobile** (<768px): Single column layout, full-width buttons

---

## 🐛 Troubleshooting

### Token Invalid

**Problem**: Error "Invalid or expired token"  
**Solution**:

- Check token di localStorage: `localStorage.getItem('token')`
- Ensure JWT_SECRET matches backend
- Check token expiration (default 1 hour)

### CORS Error

**Problem**: "Access to XMLHttpRequest blocked by CORS policy"  
**Solution**:

- Verify backend CORS config di `app.js`
- Frontend URL harus di CORS whitelist
- Check API_BASE URL matches backend

### Songs Not Loading

**Problem**: Songs table empty atau loading forever  
**Solution**:

- Check `/api/reviews` endpoint exists
- Verify admin token valid
- Check browser console untuk error details

### Users Not Loading

**Problem**: Users table empty  
**Solution**:

- Check `/api/admin/users` endpoint exists
- Verify user sudah login (token valid)
- Check no users created di database yet

---

## 📄 Environment Setup

### Required in `.env.local` (React)

```
REACT_APP_API_BASE=http://localhost:5000/api
```

### Then update AdminDashboard.jsx:

```jsx
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";
```

---

## 📦 Dependencies

Component ini require:

- React 16.8+ (untuk Hooks)
- React Router (untuk navigation)
- No external UI library required (pure CSS)

---

## 🎬 Next Steps

1. ✅ Copy AdminDashboard.jsx dan AdminDashboard.css ke project React
2. ✅ Setup routing di App.jsx
3. ✅ Update login handler untuk gunakan redirectUrl
4. ✅ Test login dengan admin account
5. ✅ Verify API endpoints working
6. ✅ Check responsive design di mobile

---

Selamat! AdminDashboard siap digunakan! 🎉
