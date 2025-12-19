# Authentication & Admin Login Guide

## Login Response Structure

### Success Response (200)

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "username": "username",
    "email": "user@email.com",
    "role": "admin" | "user"
  },
  "redirectUrl": "/admin" | "/dashboard"
}
```

## Frontend Implementation

### Login & Redirect Example

```javascript
const handleLogin = async (email, password) => {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    // Simpan token di localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // Redirect berdasarkan role
    if (data.user.role === "admin") {
      window.location.href = "/admin/dashboard";
    } else {
      window.location.href = "/dashboard";
    }
  }
};
```

## Admin Endpoints

### 1. Admin Dashboard

- **URL**: `GET /api/admin/dashboard`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: Dashboard info with user data

### 2. Get All Users

- **URL**: `GET /api/admin/users`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: List of all users with id, username, email, role

### 3. Add Song

- **URL**: `POST /api/admin/songs`
- **Headers**: `Authorization: Bearer {token}`
- **Body**:

```json
{
  "title": "Song Title",
  "artist": "Artist Name",
  "genre": "Genre",
  "year": 2024
}
```

### 4. Update Song

- **URL**: `PUT /api/admin/songs/{id}`
- **Headers**: `Authorization: Bearer {token}`
- **Body**: (same as Add Song)

### 5. Delete Song

- **URL**: `DELETE /api/admin/songs/{id}`
- **Headers**: `Authorization: Bearer {token}`

## Key Changes Made

✅ **Login Response** - Sekarang include `redirectUrl` untuk admin/user
✅ **Admin Routes** - Complete dengan semua endpoint yang dibutuhkan
✅ **Error Handling** - Semua controller punya try-catch
✅ **Admin Middleware** - Protect semua admin routes
✅ **JWT Secret** - Fix untuk gunakan constant yang sama

## Testing Admin Login

1. Create admin user di database dengan `role: 'admin'`
2. Login dengan admin credentials
3. Response akan include `"redirectUrl": "/admin"`
4. Frontend bisa gunakan redirect URL tersebut untuk navigate
