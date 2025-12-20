# 🔧 Fix Backend Errors - Checklist

## Masalah yang Teridentifikasi

### 1. ❌ HTTP 500 pada `/api/songs` & `/api/admin/songs`
**Penyebab**: Database belum ter-sync dengan model baru (Song model dengan field baru)

**Solusi**:
- ✅ Update `config/db.js` untuk sync models dengan `sequelize.sync()`
- ✅ Import semua models sebelum sync
- ✅ Enhanced error logging

### 2. ❌ HTTP 404 pada `/api/admin/artists`
**Penyebab**: Mungkin routes belum ter-deploy ke Railway atau cache issue

**Solusi**:
- ✅ Verify routes sudah terdaftar di `adminRoutes.js`
- ✅ Verify Artist model & controller exist
- Perlu re-deploy ke Railway

### 3. ⚠️ General 500 Errors
**Penyebab**: Missing columns di database table

**Solusi**:
- ✅ Enhanced error messages untuk debugging
- ✅ Database sync dengan `alter: true` (akan add missing columns)

## Changes Made

### File 1: `config/db.js` ✅
```javascript
// BEFORE:
const connectDB = async () => {
  try {
    await sequelize.authenticate();
  } catch (err) { ... }
};

// AFTER:
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    require('../models/user');
    require('../models/Song');
    require('../models/Artist');
    require('../models/comment');
    await sequelize.sync({ alter: true });  // SYNC MODELS!
  } catch (err) { ... }
};
```

### File 2: `routes/songRoutes.js` ✅
- Enhanced error logging dengan `console.error()`
- Better error messages dengan `error: err.message`

## 📋 Steps to Fix Production

### Step 1: Ensure Node Modules Dependencies
```bash
npm install
# or
npm install sequelize
```

### Step 2: Re-deploy to Railway
```bash
git add .
git commit -m "Fix: Database sync & error handling for Song/Artist models"
git push origin main
# or push ke Railway repo
```

> Railway akan auto-redeploy ketika push ke branch

### Step 3: Monitor Logs
Di Railway dashboard:
1. Go to "Deployments"
2. Click latest deployment
3. Watch "Logs" tab for errors
4. Look for: "✅ Database models synced successfully"

### Step 4: Test Endpoints

**Test GET Songs (public)**:
```bash
curl https://backendsongrate-production.up.railway.app/api/songs
```

Expected response:
```json
[
  {
    "id": "uuid...",
    "title": "Song Title",
    "artist": "Artist Name",
    "type": "single",
    ...
  }
]
```

**Test POST Song (admin)**:
```bash
curl -X POST https://backendsongrate-production.up.railway.app/api/admin/songs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{"title": "Test", "artist": "Test Artist", "type": "single"}'
```

**Test GET Artists (admin)**:
```bash
curl https://backendsongrate-production.up.railway.app/api/admin/artists \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

## If Still Getting 500 Errors

Check Railway logs untuk error details:

1. **Missing Column Error**:
   ```
   Error: column "title" does not exist
   ```
   → Database table schema tidak match dengan model
   → Re-run: `sequelize.sync({ force: true })` untuk reset table (⚠️ Will delete data!)

2. **Model Import Error**:
   ```
   Error: Cannot find module '../models/Song'
   ```
   → Verify file paths correct di `config/db.js`

3. **Connection Error**:
   ```
   Error: connect ECONNREFUSED
   ```
   → Database URL invalid atau PostgreSQL down
   → Check `process.env.DATABASE_URL`

## Preventive Measures

1. ✅ Always import models before using
2. ✅ Add error logging untuk debugging
3. ✅ Use `sequelize.sync()` untuk auto-create tables
4. ✅ Test locally first sebelum push ke production

## Notes

- Song model sudah updated dengan field baru (type, releaseDate, duration, image, description, highlight, status)
- Artist model baru sudah ditambahkan
- Routes sudah terdaftar untuk semua CRUD operations
- Error handling sudah ditingkatkan dengan console logging

---

**Status**: Ready untuk di-deploy ke Railway ✅
