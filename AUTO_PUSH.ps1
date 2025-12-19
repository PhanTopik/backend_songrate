# Auto Install Git + Push Script

Run script ini untuk auto-install git dan push changes:

```powershell
# Right-click PowerShell, run as Administrator
# Then paste ini:

# Step 1: Install Chocolatey (if not exists)
$chocoPath = "C:\ProgramData\chocolatey\bin\choco.exe"
if (-not (Test-Path $chocoPath)) {
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
}

# Step 2: Install Git
choco install git -y

# Step 3: Configure Git
git config --global user.name "SongRate Developer"
git config --global user.email "dev@songrate.com"

# Step 4: Go to project
cd D:\backend_songrate

# Step 5: Push changes
git add app.js
git commit -m "fix: update CORS to allow localhost:5175"
git push origin main

Write-Host "✅ Done! Check Railway dashboard in 1-2 minutes"
```

---

## OR Manual Steps (Simpler):

1. Download Git: https://git-scm.com/download/win
2. Run installer (next, next, finish)
3. Restart PowerShell
4. Run this:

```powershell
cd D:\backend_songrate
git add app.js
git commit -m "fix: update CORS to allow localhost:5175"
git push origin main
```

---

That's it! Railway will auto-deploy 🚀
