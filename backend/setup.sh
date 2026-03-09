#!/bin/bash
# Hackathon Platform - Backend Setup Script (macOS/Linux)
# This script automates the backend setup process

echo ""
echo "========================================"
echo " Hackathon Platform Backend Setup"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "[1/5] Node.js detected:"
node --version

# Navigate to backend directory
cd backend || exit

echo ""
echo "[2/5] Installing dependencies..."
echo "Please wait, this may take a few minutes..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: npm install failed!"
    exit 1
fi

echo ""
echo "[3/5] Creating .env file from template..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Created .env file"
else
    echo ".env file already exists"
fi

echo ""
echo "[4/5] Checking MongoDB..."
echo ""
echo "NOTE: Make sure MongoDB is running!"
echo "- Local: mongod"
echo "- Atlas: Use connection string in .env"
echo ""

echo "[5/5] Setup complete!"
echo ""
echo "========================================"
echo " Next Steps:"
echo "========================================"
echo ""
echo "1. Edit .env file with your configuration:"
echo "   nano .env"
echo "   - MONGODB_URI"
echo "   - JWT_SECRET"
echo "   - EMAIL credentials"
echo "   - FRONTEND_URL"
echo ""
echo "2. Start the backend:"
echo "   npm run dev"
echo ""
echo "3. Test the API:"
echo "   curl http://localhost:5000/api/health"
echo ""
echo "4. Frontend integration:"
echo "   See FRONTEND_INTEGRATION.md"
echo ""
