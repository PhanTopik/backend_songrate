# 🔧 Install Git + Push Changes

## Step 1: Download Git
Download dari: https://git-scm.com/download/win

Pilih versi terbaru (64-bit recommended untuk Windows)

---

## Step 2: Install Git
1. Run installer
2. **Keep defaults** (jangan di-customize)
3. Finish installation
4. **RESTART PowerShell** (tutup dan buka lagi)

---

## Step 3: Configure Git (First time only)
```powershell
git config --global user.name "Your Name"
git config --global user.email "youremail@example.com"
```

---

## Step 4: Verify Git Installed
```powershell
git --version
```

Should show: `git version 2.x.x.windows.x`

---

## Step 5: Push Changes to Railway
```powershell
cd D:\backend_songrate

# Check status
git status

# Add changes
git add app.js

# Commit
git commit -m "fix: update CORS to allow localhost:5175"

# Push
git push origin main
# atau
git push origin master
```

---

## Step 6: Verify in Railway
1. Go to https://railway.app/
2. Select project: backendsongrate-production
3. Check **Deployments** tab
4. Should show new deployment "Deploying" → "Live"
5. Wait 1-2 minutes for live

---

## Step 7: Test Login
1. Refresh browser (Ctrl+F5)
2. Try login dari localhost:5175
3. CORS error should be gone! ✅

---

**Just install Git from https://git-scm.com/download/win, restart PowerShell, then run Step 5 commands!**
