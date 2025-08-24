#!/bin/bash

# 🚀 GCADR Backend Automated Setup Script
# This script sets up the Django backend automatically

set -e  # Exit on any error

echo "🚀 Starting GCADR Backend Setup..."
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the backend directory
if [ ! -f "manage.py" ]; then
    print_error "manage.py not found. Please run this script from the backend directory."
    echo "Usage: cd backend && ./setup_backend.sh"
    exit 1
fi

print_status "Found Django project. Continuing setup..."

# Step 1: Check Python version
print_status "Checking Python version..."
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
    PIP_CMD="pip3"
    PYTHON_VERSION=$(python3 --version 2>&1 | cut -d' ' -f2)
    print_success "Found Python 3: $PYTHON_VERSION"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
    PIP_CMD="pip"
    PYTHON_VERSION=$(python --version 2>&1 | cut -d' ' -f2)
    print_success "Found Python: $PYTHON_VERSION"
else
    print_error "Python not found. Please install Python 3.8 or higher."
    exit 1
fi

# Step 2: Create virtual environment
print_status "Creating virtual environment..."
if [ -d "venv" ]; then
    print_warning "Virtual environment already exists. Removing old one..."
    rm -rf venv
fi

$PYTHON_CMD -m venv venv
print_success "Virtual environment created successfully!"

# Step 3: Activate virtual environment
print_status "Activating virtual environment..."
source venv/bin/activate
print_success "Virtual environment activated!"

# Step 4: Upgrade pip
print_status "Upgrading pip..."
$PIP_CMD install --upgrade pip
print_success "Pip upgraded successfully!"

# Step 5: Install dependencies
print_status "Installing dependencies..."
if [ -f "requirements.txt" ]; then
    $PIP_CMD install -r requirements.txt
    print_success "Dependencies installed successfully!"
else
    print_error "requirements.txt not found!"
    exit 1
fi

# Step 6: Run migrations
print_status "Setting up database..."
$PYTHON_CMD manage.py migrate
print_success "Database migrations completed!"

# Step 7: Create superuser automatically
print_status "Creating admin user..."
$PYTHON_CMD manage.py shell << EOF
from django.contrib.auth import get_user_model
User = get_user_model()

# Delete existing admin user if exists
if User.objects.filter(username='admin').exists():
    User.objects.filter(username='admin').delete()
    print("Removed existing admin user")

# Create new admin user
admin_user = User.objects.create_superuser(
    username='admin',
    email='admin@gcadr.gnlu.ac.in',
    password='admin123'
)
print("Admin user created successfully!")
print("Username: admin")
print("Password: admin123")
EOF

print_success "Admin user created: admin/admin123"

# Step 8: Collect static files
print_status "Collecting static files..."
$PYTHON_CMD manage.py collectstatic --noinput
print_success "Static files collected!"

# Step 9: Verify Django configuration
print_status "Verifying Django configuration..."
$PYTHON_CMD manage.py check
if [ $? -eq 0 ]; then
    print_success "Django configuration verified successfully!"
else
    print_error "Django configuration check failed!"
    exit 1
fi

# Final success message
echo ""
echo "🎉 GCADR Backend Setup Complete!"
echo "================================="
echo ""
print_success "✅ Virtual environment created and activated"
print_success "✅ Dependencies installed"
print_success "✅ Database set up and migrated"
print_success "✅ Admin user created (admin/admin123)"
print_success "✅ Static files collected"
print_success "✅ Django configuration verified"
echo ""
echo "🚀 To start the server:"
echo "   $PYTHON_CMD manage.py runserver"
echo ""
echo "🌐 Access points:"
echo "   Admin Panel: http://localhost:8000/admin/"
echo "   Content Manager: http://localhost:8000/content/"
echo "   API: http://localhost:8000/api/"
echo ""
echo "👤 Admin credentials:"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
print_success "Setup completed successfully! 🎉"
