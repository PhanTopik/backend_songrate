# 🚀 Deploy to Railway - Detailed Guide

## 🔴 Problem
CORS still blocking requests karena backend di Railway belum update

## ✅ Solution
Push updated `app.js` ke GitHub → Railway auto-deploy

---

## 📋 Option 1: Push via GitHub Web (Easiest)

### Step 1: Go to GitHub
1. Open: https://github.com/PhanTopik/backend_songrate
2. Login dengan akun GitHub Anda

### Step 2: Edit app.js via GitHub Web
1. Click file: `app.js`
2. Click ✏️ (Edit button) di top right
3. Find the CORS section (line 15-19)
4. Replace dengan ini:

```javascript
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests dengan atau tanpa origin (untuk mobile, desktop apps)
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:5175",
        "http://localhost:3000",
        "http://localhost:3001",
        "https://songrate.vercel.app"
      ];
      
      // Untuk development, allow semua localhost
      if (!origin || origin.includes("localhost") || origin.includes("127.0.0.1")) {
        return callback(null, true);
      }
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Temporary: allow all untuk development
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
```

### Step 3: Commit Changes
1. Scroll ke bawah
2. Click **Commit changes**
3. Add message: "fix: update CORS to allow localhost:5175"
4. Click **Commit**

### Step 4: Railway Auto-Deploy
- Railway akan detect push otomatis
- Check dashboard: https://railway.app/
- Status akan change ke "Deploying" → "Live"
- Tunggu ~1-2 menit

---

## 📋 Option 2: Install Git & Push Locally

### Step 1: Install Git
1. Download: https://git-scm.com/download/win
2. Run installer
3. Choose default options
4. Restart PowerShell

### Step 2: Configure Git
```powershell
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### Step 3: Push Changes
```powershell
cd D:\backend_songrate
git add app.js
git commit -m "fix: update CORS to allow localhost:5175"
git push origin main
```

**Atau jika main branch:**
```powershell
git push origin master
```

### Step 4: Verify
- Check Railway dashboard
- Should show "Deploying" status
- Wait ~2 minutes for live

---

## 📋 Option 3: Manual Redeploy (Quick Fix)

### If deployed already on Railway:
1. Login to: https://railway.app/
2. Select project: `backendsongrate-production`
3. Go to **Deployments** tab
4. Click **Redeploy** button on latest deployment
5. Wait untuk selesai

---

## ✅ Verify After Deploy

### Check 1: Backend Running
```
Open: https://backendsongrate-production.up.railway.app/
Should show: "API SongRATE Running..."
```

### Check 2: Test CORS
Open browser console dan run:
```javascript
fetch('https://backendsongrate-production.up.railway.app/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@test.com', password: 'test' })
})
.then(res => {
  console.log('Status:', res.status);
  console.log('Headers:', res.headers);
  return res.json();
})
.then(data => console.log('✅ CORS OK:', data))
.catch(err => console.log('❌ Error:', err))
```

---

## 🎯 Summary

**Perubahan di app.js:**
- ✅ Allow semua localhost ports (5173, 5175, 3000, 3001)
- ✅ Allow all methods (GET, POST, PUT, DELETE, PATCH, OPTIONS)
- ✅ Allow Authorization header
- ✅ Flexible CORS untuk development

**Setelah deploy:**
1. Refresh browser
2. Try login dari localhost:5175
3. CORS error seharusnya gone!

---

## 💡 Still Not Working?

### Check 1: Deployment Status
- Railway dashboard menunjukkan apa?
- Status "Live" atau "Failed"?

### Check 2: Browser Cache
```
Clear cache: Ctrl+Shift+Delete
Hard refresh: Ctrl+F5
```

### Check 3: Network Tab
- DevTools → Network tab
- Try login
- Lihat request ke API
- Check response headers ada CORS?

---

Gunakan **Option 1 (GitHub Web)** kalau paling mudah! 🚀
