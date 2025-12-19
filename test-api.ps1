# PowerShell script untuk test API endpoints
# Run: powershell -ExecutionPolicy Bypass -File test-api.ps1

$API_BASE = "http://localhost:5000"

Write-Host "🔍 Testing SongRate Backend API" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# Test 1: Check Backend Status
Write-Host ""
Write-Host "1️⃣ Check Backend Status" -ForegroundColor Yellow
Write-Host "GET $API_BASE/" -ForegroundColor Gray

try {
    $response = Invoke-WebRequest -Uri "$API_BASE/" -Method Get -TimeoutSec 5
    Write-Host "✅ Backend Running!" -ForegroundColor Green
    Write-Host $response.Content
} catch {
    Write-Host "❌ Backend not running! Make sure to run: npm start" -ForegroundColor Red
    exit
}

# Test 2: Signup
Write-Host ""
Write-Host ""
Write-Host "2️⃣ Test Signup" -ForegroundColor Yellow
Write-Host "POST $API_BASE/api/auth/signup" -ForegroundColor Gray

$signupBody = @{
    username = "testadmin"
    email = "admin@test.com"
    password = "password123"
} | ConvertTo-Json

try {
    $signupResponse = Invoke-WebRequest -Uri "$API_BASE/api/auth/signup" `
        -Method Post `
        -Headers @{"Content-Type"="application/json"} `
        -Body $signupBody `
        -TimeoutSec 5
    Write-Host $signupResponse.Content -ForegroundColor Green
} catch {
    Write-Host "ℹ️ User might already exist (that's ok)" -ForegroundColor Yellow
    Write-Host $_.Exception.Response.StatusCode
}

# Test 3: Login
Write-Host ""
Write-Host ""
Write-Host "3️⃣ Test Login" -ForegroundColor Yellow
Write-Host "POST $API_BASE/api/auth/login" -ForegroundColor Gray

$loginBody = @{
    email = "admin@test.com"
    password = "password123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-WebRequest -Uri "$API_BASE/api/auth/login" `
        -Method Post `
        -Headers @{"Content-Type"="application/json"} `
        -Body $loginBody `
        -TimeoutSec 5
    
    Write-Host $loginResponse.Content -ForegroundColor Green
    
    # Extract token
    $loginData = $loginResponse.Content | ConvertFrom-Json
    $TOKEN = $loginData.token
    
    Write-Host ""
    Write-Host "🔑 Token: $TOKEN" -ForegroundColor Cyan
    
    # Test 4: Get All Users
    Write-Host ""
    Write-Host ""
    Write-Host "4️⃣ Test Get All Users" -ForegroundColor Yellow
    Write-Host "GET $API_BASE/api/admin/users" -ForegroundColor Gray
    
    try {
        $usersResponse = Invoke-WebRequest -Uri "$API_BASE/api/admin/users" `
            -Method Get `
            -Headers @{"Authorization"="Bearer $TOKEN"} `
            -TimeoutSec 5
        Write-Host $usersResponse.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10 -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to fetch users: " $_.Exception.Message -ForegroundColor Red
    }
    
    # Test 5: Get Dashboard
    Write-Host ""
    Write-Host ""
    Write-Host "5️⃣ Test Admin Dashboard" -ForegroundColor Yellow
    Write-Host "GET $API_BASE/api/admin/dashboard" -ForegroundColor Gray
    
    try {
        $dashResponse = Invoke-WebRequest -Uri "$API_BASE/api/admin/dashboard" `
            -Method Get `
            -Headers @{"Authorization"="Bearer $TOKEN"} `
            -TimeoutSec 5
        Write-Host $dashResponse.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10 -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to fetch dashboard: " $_.Exception.Message -ForegroundColor Red
    }
    
} catch {
    Write-Host "❌ Login failed: " $_.Exception.Message -ForegroundColor Red
    Write-Host "Make sure user exists or create one first" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ API Test Complete!" -ForegroundColor Green
