# ⚡ SOLUSI CEPAT - CORS Error Fix

## 🔴 Problem

```
CORS error: Access to fetch blocked
No 'Access-Control-Allow-Origin' header
```

## ✅ Status

- ✅ `app.js` sudah di-update dengan CORS yang benar
- ⏳ Perlu push ke GitHub → Railway deploy otomatis

---

## 📋 2 Cara Push (Pick ONE)

### **CARA 1: Install Git (PALING MUDAH)**

1. **Download Git:**

   - Buka: https://git-scm.com/download/win
   - Click download

2. **Install Git:**

   - Run installer
   - Keep default settings
   - Finish

3. **Restart PowerShell:**

   - Tutup PowerShell
   - Buka lagi

4. **Push Changes:**

   ```powershell
   cd D:\backend_songrate
   git add app.js
   git commit -m "fix: cors update"
   git push origin main
   ```

5. **Done!**
   - Railway akan auto-deploy dalam 1-2 menit
   - Cek https://railway.app/

---

### **CARA 2: Manual di GitHub Web**

1. Buka: https://github.com/PhanTopik/backend_songrate
2. Klik file `app.js`
3. Klik ✏️ (Edit)
4. Replace CORS section dengan code dari `app.js` di folder ini
5. Commit changes
6. Done!

---

## ✅ Setelah Deploy (1-2 menit)

1. Refresh browser (Ctrl+F5)
2. Try login dari localhost:5175
3. ✅ CORS error gone!

---

## 🔍 Check Railway Status

- https://railway.app/
- Select `backendsongrate-production`
- Check "Deployments" tab
- Status should be "Live" ✅

---

**RECOMMENDED: Cara 1 (Install Git) - paling cepat!** ⚡
