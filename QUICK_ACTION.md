# ⚡ QUICK ACTION STEPS

## 🔴 Current Issue

- Backend di Railway tidak recognize `localhost:5175` di CORS
- Frontend tidak bisa login

## ✅ Fix Applied Locally

Updated `app.js` dengan CORS yang lebih permissive

---

## 📤 PUSH TO RAILWAY (Choose 1 method)

### METHOD 1: GitHub Web (EASIEST - 2 minutes)

```
1. Open GitHub: https://github.com/PhanTopik/backend_songrate
2. Click "app.js" file
3. Click ✏️ icon (Edit)
4. Replace CORS section (lines 15-50) with:

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:5175",
        "http://localhost:3000",
        "http://localhost:3001",
        "https://songrate.vercel.app"
      ];

      if (!origin || origin.includes("localhost") || origin.includes("127.0.0.1")) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

5. Click "Commit changes"
6. Done! Railway will auto-deploy in 1-2 minutes
```

---

### METHOD 2: Manual Redeploy

```
1. Open: https://railway.app/
2. Login & select project "backendsongrate-production"
3. Click "Deployments" tab
4. Find latest deployment
5. Click "Redeploy"
6. Wait ~2 minutes
```

---

## ✅ After Deploy (2-3 minutes later)

1. **Refresh browser** (Ctrl+F5)
2. **Try login again** dari localhost:5175
3. **Check console** untuk error

---

## 🔍 Test Current Status

Open browser console and run:

```javascript
fetch("https://backendsongrate-production.up.railway.app/")
  .then((r) => r.text())
  .then((d) => console.log("✅ Backend OK:", d))
  .catch((e) => console.log("❌ Backend Error:", e));
```

---

## 🚨 Still Not Working?

1. Check Railway dashboard - status must be "Live"
2. Wait full 2-3 minutes for deployment
3. Clear browser cache: Ctrl+Shift+Delete
4. Try incognito mode
5. Check Network tab in DevTools for actual error response

---

**RECOMMENDED: Use Method 1 (GitHub Web) - fastest!** ⚡
