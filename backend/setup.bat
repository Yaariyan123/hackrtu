@echo off
REM Hackathon Platform - Backend Setup Script (Windows)
REM This script automates the backend setup process

echo.
echo ========================================
echo  Hackathon Platform Backend Setup
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/5] Node.js detected: 
node --version

REM Navigate to backend directory
cd backend

echo.
echo [2/5] Installing dependencies...
echo Please wait, this may take a few minutes...
call npm install
if errorlevel 1 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)

echo.
echo [3/5] Creating .env file from template...
if not exist .env (
    copy .env.example .env
    echo Created .env file
) else (
    echo .env file already exists
)

echo.
echo [4/5] Checking MongoDB...
echo.
echo NOTE: Make sure MongoDB is running!
echo - Local: mongod
echo - Atlas: Use connection string in .env
echo.

echo [5/5] Setup complete!
echo.
echo ========================================
echo  Next Steps:
echo ========================================
echo.
echo 1. Edit .env file with your configuration:
echo    - MONGODB_URI
echo    - JWT_SECRET
echo    - EMAIL credentials
echo    - FRONTEND_URL
echo.
echo 2. Start the backend:
echo    npm run dev
echo.
echo 3. Test the API:
echo    curl http://localhost:5000/api/health
echo.
echo 4. Frontend integration:
echo    See FRONTEND_INTEGRATION.md
echo.

pause
