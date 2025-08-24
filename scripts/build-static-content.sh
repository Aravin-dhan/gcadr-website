#!/bin/bash

# GCADR Static Content Build Script
# This script generates static content from the backend for frontend consumption

set -e  # Exit on any error

echo "🚀 GCADR Static Content Build Script"
echo "===================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BACKEND_DIR="backend"
CONTENT_DIR="content"
PUBLIC_DIR="public"
API_DIR="$PUBLIC_DIR/api"
MEDIA_DIR="$PUBLIC_DIR/media"

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

# Check if backend directory exists
if [ ! -d "$BACKEND_DIR" ]; then
    print_error "Backend directory not found: $BACKEND_DIR"
    exit 1
fi

# Check if content directory exists
if [ ! -d "$CONTENT_DIR" ]; then
    print_warning "Content directory not found: $CONTENT_DIR"
    print_status "Creating content directory structure..."
    mkdir -p "$CONTENT_DIR"/{blogs,team,pages,media/{team,carousel,blogs,events},config}
fi

# Create public directories
print_status "Creating public directory structure..."
mkdir -p "$API_DIR"
mkdir -p "$MEDIA_DIR"

# Change to backend directory
cd "$BACKEND_DIR"

# Check if virtual environment exists
if [ ! -d "venv" ] && [ ! -d ".venv" ]; then
    print_warning "No virtual environment found. Creating one..."
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
else
    # Activate virtual environment
    if [ -d "venv" ]; then
        source venv/bin/activate
    elif [ -d ".venv" ]; then
        source .venv/bin/activate
    fi
fi

print_status "Virtual environment activated"

# Check if Django is available
if ! python -c "import django" 2>/dev/null; then
    print_error "Django not found. Installing requirements..."
    pip install -r requirements.txt
fi

# Set Django settings
export DJANGO_SETTINGS_MODULE="gcadr_backend.settings"

print_status "Running Django migrations..."
python manage.py migrate --noinput

# Import content from files
print_status "Importing content from markdown and YAML files..."

# Import markdown blogs
if [ -d "../$CONTENT_DIR/blogs" ]; then
    print_status "Importing blog posts from markdown files..."
    python manage.py import_markdown_blogs --content-dir="../$CONTENT_DIR/blogs"
fi

# Import team data
if [ -f "../$CONTENT_DIR/team/team-members.yaml" ]; then
    print_status "Importing team data from YAML files..."
    python manage.py import_team_data --content-dir="../$CONTENT_DIR/team"
fi

# Import configuration data
if [ -d "../$CONTENT_DIR/config" ]; then
    print_status "Importing configuration data from YAML files..."
    python manage.py import_config_data --content-dir="../$CONTENT_DIR/config"
fi

# Export static content
print_status "Exporting dynamic content to static JSON files..."
python manage.py export_static_content --output-dir="../$API_DIR"

# Copy media files from content directory
print_status "Copying media files..."
if [ -d "../$CONTENT_DIR/media" ]; then
    cp -r "../$CONTENT_DIR/media/"* "../$MEDIA_DIR/" 2>/dev/null || true
fi

# Copy any existing backend media files
if [ -d "media" ]; then
    cp -r media/* "../$MEDIA_DIR/" 2>/dev/null || true
fi

# Return to root directory
cd ..

# Create a build info file
print_status "Creating build information..."
cat > "$PUBLIC_DIR/build-info.json" << EOF
{
  "build_date": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "build_script_version": "1.0.0",
  "content_source": "static",
  "last_updated": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF

# Create a simple API status endpoint
cat > "$API_DIR/status.json" << EOF
{
  "status": "static",
  "message": "Using static content files",
  "build_date": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "endpoints": [
    "/api/blogs.json",
    "/api/team.json",
    "/api/leadership.json",
    "/api/announcements.json",
    "/api/carousel.json",
    "/api/galleries.json",
    "/api/newsletters.json"
  ]
}
EOF

# Generate a content manifest
print_status "Generating content manifest..."
cat > "$API_DIR/manifest.json" << EOF
{
  "version": "1.0.0",
  "generated": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "content_types": {
    "blogs": {
      "file": "blogs.json",
      "individual_files": true,
      "directory": "blogs/"
    },
    "team": {
      "file": "team.json"
    },
    "leadership": {
      "file": "leadership.json"
    },
    "announcements": {
      "file": "announcements.json"
    },
    "carousel": {
      "file": "carousel.json"
    },
    "galleries": {
      "file": "galleries.json"
    },
    "newsletters": {
      "file": "newsletters.json"
    }
  },
  "media_directory": "/media/"
}
EOF

print_success "✅ Static content build completed successfully!"
print_status "📁 Generated files:"
print_status "   - API files: $API_DIR/"
print_status "   - Media files: $MEDIA_DIR/"
print_status "   - Build info: $PUBLIC_DIR/build-info.json"

echo ""
print_success "🎉 Your GCADR website is now ready for static deployment!"
print_status "Next steps:"
print_status "1. Commit the generated files: git add public/ && git commit -m 'Update static content'"
print_status "2. Push to GitHub: git push"
print_status "3. Vercel will automatically deploy the updated content"

echo ""
print_status "To update content in the future:"
print_status "1. Edit files in the content/ directory"
print_status "2. Run this script again: ./scripts/build-static-content.sh"
print_status "3. Commit and push the changes"
