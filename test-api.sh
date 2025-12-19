#!/bin/bash
# Test API endpoints

API_BASE="http://localhost:5000"

echo "🔍 Testing SongRate Backend API"
echo "=============================="

# Test 1: Check if backend is running
echo ""
echo "1️⃣ Check Backend Status"
echo "GET $API_BASE/"
curl -s "$API_BASE/" || echo "❌ Backend not running!"

# Test 2: Signup
echo ""
echo ""
echo "2️⃣ Test Signup"
echo "POST $API_BASE/api/auth/signup"
SIGNUP_RESPONSE=$(curl -s -X POST "$API_BASE/api/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testadmin",
    "email": "admin@test.com",
    "password": "password123"
  }')
echo "$SIGNUP_RESPONSE"

# Test 3: Login
echo ""
echo ""
echo "3️⃣ Test Login"
echo "POST $API_BASE/api/auth/login"
LOGIN_RESPONSE=$(curl -s -X POST "$API_BASE/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "password123"
  }')
echo "$LOGIN_RESPONSE"

# Extract token
TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo ""
echo "Token: $TOKEN"

# Test 4: Get All Users
echo ""
echo ""
echo "4️⃣ Test Get All Users"
echo "GET $API_BASE/api/admin/users"
curl -s "$API_BASE/api/admin/users" \
  -H "Authorization: Bearer $TOKEN" | json_pp

# Test 5: Get Dashboard
echo ""
echo ""
echo "5️⃣ Test Admin Dashboard"
echo "GET $API_BASE/api/admin/dashboard"
curl -s "$API_BASE/api/admin/dashboard" \
  -H "Authorization: Bearer $TOKEN" | json_pp

echo ""
echo "✅ API Test Complete!"
