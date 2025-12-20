# Artist Management - Implementation Guide

## Backend Changes

### 1. New Model: `models/Artist.js`
Sudah dibuat dengan fields:
- `id` (UUID, Primary Key)
- `name` (String, required, unique)
- `genre` (String)
- `bio` (Text)
- `image` (Text - URL)
- `followers` (Integer, default 0)
- `verified` (Boolean, default false)

### 2. New Controller Functions in `controllers/adminController.js`
```javascript
// Tambah artis
POST /api/admin/artists
- Body: { name, genre, bio, image, followers, verified }
- Response: { message, artist }

// Lihat semua artis
GET /api/admin/artists
- Response: { message, artists }

// Edit artis
PUT /api/admin/artists/:id
- Body: { name, genre, bio, image, followers, verified }
- Response: { message, artist }

// Hapus artis
DELETE /api/admin/artists/:id
- Response: { message }
```

### 3. New Routes in `routes/adminRoutes.js`
Routes sudah ditambahkan untuk semua CRUD operations artist.

## Frontend Changes

### Ganti Analytics dengan ArtistManagement

**File Location**: `src/pages/ArtistManagement.jsx` (atau sesuai struktur project kamu)

**Kode sudah disediakan dalam file**: `ARTIST_MANAGEMENT_PAGE.jsx`

**Langkah implementasi:**

1. Copy content dari `ARTIST_MANAGEMENT_PAGE.jsx`
2. Paste ke halaman Analytics (atau buat file baru `ArtistManagement.jsx`)
3. Update router/navigation untuk mengarahkan ke halaman baru:

**Contoh (jika pakai React Router):**
```javascript
import ArtistManagement from "../pages/ArtistManagement";

// Di routes config:
<Route path="/admin/artists" element={<ArtistManagement />} />
```

4. Update sidebar menu dari "Analytics" ke "Artist Management":
```javascript
// Ubah di sidebar navigation
<li>
  <Link to="/admin/artists" className="...">
    🎤 Artist Management
  </Link>
</li>
```

## API Examples

### Tambah Artis
```bash
curl -X POST http://localhost:3000/api/admin/artists \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "The Weeknd",
    "genre": "R&B/Hip-Hop",
    "bio": "Abel Makkonen Tesfaye, known professionally as The Weeknd",
    "image": "https://example.com/weeknd.jpg",
    "followers": 50000000,
    "verified": true
  }'
```

### Lihat Semua Artis
```bash
curl -X GET http://localhost:3000/api/admin/artists \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### Edit Artis
```bash
curl -X PUT http://localhost:3000/api/admin/artists/:id \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "followers": 55000000
  }'
```

### Hapus Artis
```bash
curl -X DELETE http://localhost:3000/api/admin/artists/:id \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

## Features

✅ **Tambah Artis** - Dengan validasi nama (required)
✅ **Edit Artis** - Update semua field (name, genre, bio, image, followers, verified)
✅ **Hapus Artis** - Dengan konfirmasi
✅ **Lihat Daftar Artis** - Table view dengan sorting
✅ **Verified Badge** - Menunjukkan status verified artist
✅ **Error Handling** - Menampilkan error messages
✅ **Loading State** - Loading indicator saat fetch data
✅ **Responsive Design** - Cocok untuk desktop & mobile

## Environment Setup

Pastikan `REACT_APP_API_URL` di `.env` frontend sudah di-setup:
```
REACT_APP_API_URL=http://localhost:3000
```

atau gunakan proxy di `package.json`:
```json
{
  "proxy": "http://localhost:3000"
}
```

## Database Migration (Jika diperlukan)

Jika menggunakan Sequelize, jalankan:
```bash
npx sequelize-cli db:migrate
```

Atau jika auto-sync enabled di config, database akan auto-create table saat app start.

## Next Steps

1. ✅ Backend routes sudah ready
2. ✅ Component React sudah siap
3. Integrasikan component ke frontend routing
4. Update sidebar navigation menu
5. Test semua CRUD operations
6. Kaitkan Artist Management dengan Song Management (opsional - foreign key relationship)
