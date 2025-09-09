#!/bin/bash

echo "🚀 Setting up Trending Commerce Hub development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if MongoDB is running (optional)
if command -v mongosh &> /dev/null; then
    echo "✅ MongoDB CLI detected"
else
    echo "⚠️  MongoDB CLI not found. Make sure MongoDB is installed and running."
fi

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install admin dependencies
echo "📦 Installing admin dependencies..."
cd admin
npm install
cd ..

# Install shared dependencies
echo "📦 Installing shared dependencies..."
cd shared
npm install
cd ..

# Create environment files if they don't exist
if [ ! -f "backend/.env" ]; then
    echo "📝 Creating backend environment file..."
    cp backend/.env.example backend/.env
    echo "⚠️  Please update backend/.env with your configuration"
fi

# Create additional necessary directories
mkdir -p backend/uploads
mkdir -p backend/logs

echo "✅ Development environment setup complete!"
echo ""
echo "🚀 To start the development servers, run:"
echo "   npm run dev"
echo ""
echo "This will start:"
echo "   - Backend API: http://localhost:5000"
echo "   - Frontend: http://localhost:3000"
echo "   - Admin Dashboard: http://localhost:3001"
echo ""
echo "📋 Next steps:"
echo "   1. Update backend/.env with your database and API keys"
echo "   2. Start MongoDB if not already running"
echo "   3. Run 'npm run dev' to start all services"
echo ""
echo "📚 For detailed documentation, see README.md"
