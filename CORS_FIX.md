# 🚀 CORS Error Fix - Deployment Guide

## 🔴 Problem
```
CORS error: Access to fetch at 'https://backendsongrate-production.up.railway.app/api/auth/login'
from origin 'http://localhost:5175' has been blocked
```

## ✅ Solution Applied

Updated `app.js` to include ALL localhost ports in CORS origin whitelist:

```javascript
cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5175",    // ← ADDED (your dev port)
    "http://localhost:3000",
    "http://localhost:3001",
    "https://songrate.vercel.app"
  ],
  credentials: true,
})
```

---

## 📤 Deploy Changes to Railway

### Step 1: Commit Changes
```bash
cd D:\backend_songrate
git add app.js
git commit -m "fix: add localhost:5175 to CORS whitelist"
```

### Step 2: Push to Railway
```bash
git push origin main
# atau
git push
```

Railway akan auto-deploy dalam 1-2 menit.

---

## ✅ Verify Fix

Setelah deployment:
1. Tunggu Railway selesai deploy (check dashboard)
2. Refresh browser frontend
3. Try login lagi
4. Error CORS should gone!

---

## 🔍 Alternative: If Git Not Installed

**Manual deploy ke Railway:**

1. Login ke Railway: https://railway.app/
2. Select project: `backendsongrate-production`
3. Go to **Deployments**
4. Click **Redeploy**
5. Or manually push via GitHub (if connected)

---

## 💡 Troubleshooting

### Still getting CORS error?
1. Check Railway deployment status (should be ✅)
2. Force browser refresh: `Ctrl+F5`
3. Clear browser cache
4. Wait 2-3 minutes for full propagation

### Check CORS is working:
```javascript
// Open browser console and test:
fetch('https://backendsongrate-production.up.railway.app/', {
  mode: 'cors',
  credentials: 'include'
})
.then(res => res.text())
.then(data => console.log("✅ CORS OK:", data))
.catch(err => console.log("❌ CORS Error:", err))
```

---

## 📝 Changes Made

| File | Change | Status |
|------|--------|--------|
| `app.js` | Added localhost:5175 to CORS | ✅ Done |

---

## 🔐 Frontend Config

Make sure your frontend is using correct backend URL:
```javascript
// In authHelper.js or similar
const API_BASE = "https://backendsongrate-production.up.railway.app/api";
```

---

## ✨ Next Steps

1. ✅ Updated CORS in backend
2. ⏳ Deploy to Railway (git push or manual redeploy)
3. ✅ Test login from localhost:5175
4. ✅ Should work!

---

Need help with git? I can provide commands!
