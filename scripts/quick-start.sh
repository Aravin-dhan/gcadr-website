#!/bin/bash

# GCADR Quick Start Script
# Sets up the development environment and builds initial content

set -e

echo "🚀 GCADR Website Quick Start"
echo "============================"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "backend" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

print_status "Setting up GCADR website development environment..."

# Install frontend dependencies
print_status "Installing frontend dependencies..."
npm install

# Set up backend
print_status "Setting up backend environment..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ] && [ ! -d ".venv" ]; then
    print_status "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
if [ -d "venv" ]; then
    source venv/bin/activate
elif [ -d ".venv" ]; then
    source .venv/bin/activate
fi

# Install backend dependencies
print_status "Installing backend dependencies..."
pip install -r requirements.txt

# Set up database
print_status "Setting up database..."
python manage.py migrate

# Create superuser if it doesn't exist
print_status "Creating admin user..."
python manage.py shell -c "
from django.contrib.auth.models import User
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@gcadr.gnlu.ac.in', 'admin123')
    print('✅ Admin user created: admin/admin123')
else:
    print('✅ Admin user already exists: admin/admin123')
"

# Return to root directory
cd ..

# Build initial static content
print_status "Building initial static content..."
./scripts/build-static-content.sh

print_success "🎉 Setup completed successfully!"
echo ""
print_status "Next steps:"
echo "1. Start development servers:"
echo "   Frontend: npm run dev"
echo "   Backend:  npm run content:dev"
echo ""
echo "2. Access your website:"
echo "   Website:     http://localhost:3000"
echo "   Admin Panel: http://localhost:8000/admin (admin/admin123)"
echo ""
echo "3. Edit content:"
echo "   Blog posts:    content/blogs/"
echo "   Team members:  content/team/team-members.yaml"
echo "   Carousel:      content/config/carousel.yaml"
echo ""
echo "4. Deploy changes:"
echo "   npm run deploy"
echo ""
print_success "Happy content management! 🚀"
