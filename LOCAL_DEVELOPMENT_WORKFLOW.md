# 🚀 GCADR Local Development Workflow

This guide explains exactly how to edit content locally and deploy it to your live website.

## 🎯 Overview

Your GCADR website uses a **hybrid content management system**:
- **Local Backend**: Django admin for complex editing
- **File-based Content**: Direct file editing for simple changes
- **Static Generation**: Converts dynamic content to static files
- **Zero Cost Deployment**: No ongoing server costs

## 🔧 Setup (One-time)

### 1. Initial Setup
```bash
# Clone repository
git clone https://github.com/aravin-dhan/gcadr-website.git
cd gcadr-website

# Run quick setup
./scripts/quick-start.sh
```

### 2. Verify Setup
```bash
# Start backend
cd backend
source venv/bin/activate  # or source .venv/bin/activate
python manage.py runserver

# In another terminal, start frontend
npm run dev
```

**Access Points:**
- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:8000/admin (admin/admin123)
- **Content Manager**: http://localhost:8000/content/

## 📝 Content Editing Workflows

### Method 1: Web Interface (Easiest)

#### Step 1: Start Local Backend
```bash
cd backend
source venv/bin/activate
python manage.py runserver
```

#### Step 2: Access Content Manager
- **URL**: http://localhost:8000/content/
- **Login**: admin / admin123

#### Step 3: Edit Content
- **Team Members**: Click "Edit team members"
- **Carousel**: Click "Edit carousel"
- **Blog Posts**: Click "Manage blog"

#### Step 4: Build & Deploy
1. Click "Build Static Content" in the dashboard
2. Commit changes:
   ```bash
   git add .
   git commit -m "Update content via web interface"
   git push
   ```

### Method 2: File Editing (Advanced)

#### Edit Team Members
```bash
# Edit team file
vim content/team/team-members.yaml

# Add new member
- id: 13
  name: "New Student"
  position: "Research Assistant"
  year: "2023-2028"
  email: "student@gnlu.ac.in"
  linkedin_url: "https://linkedin.com/in/student"
  image: "/media/team/student.jpg"
  bio: "Passionate about ADR"
  order: 13
  active: true
```

#### Create Blog Post
```bash
# Create new blog post
cat > content/blogs/2024-03-20-workshop.md << 'EOF'
---
title: "New Workshop Announcement"
date: "2024-03-20"
author: "GCADR Team"
category: "Events"
tags: ["workshop", "arbitration"]
featured: true
published: true
excerpt: "Join us for an exciting new workshop"
featured_image: "/media/blogs/workshop.jpg"
---

# Workshop Details

We are excited to announce...
EOF
```

#### Update Carousel
```bash
# Edit carousel
vim content/config/carousel.yaml

# Add new slide
- id: 5
  title: "New Event"
  description: "Exciting announcement"
  image: "/media/carousel/event.jpg"
  title_color: "golden"
  show_title: true
  link_url: "/events/new"
  order: 5
  active: true
```

#### Deploy Changes
```bash
# Build static content
npm run content:build

# Or use individual commands
npm run content:import  # Import files to database
npm run content:export  # Export to static files

# Deploy
npm run deploy  # Builds and pushes to GitHub
```

## 🖼️ Image Management

### Adding Images

#### Team Photos
```bash
# 1. Add photo to content/media/team/
cp ~/Downloads/student-photo.jpg content/media/team/student-name.jpg

# 2. Reference in team YAML
image: "/media/team/student-name.jpg"

# 3. Build and deploy
npm run deploy
```

#### Carousel Images
```bash
# 1. Add image (1200x600px recommended)
cp ~/Downloads/banner.jpg content/media/carousel/event-banner.jpg

# 2. Update carousel.yaml
image: "/media/carousel/event-banner.jpg"

# 3. Deploy
npm run deploy
```

#### Blog Images
```bash
# 1. Add to blog media folder
cp ~/Downloads/article-image.jpg content/media/blogs/workshop-image.jpg

# 2. Reference in markdown
![Workshop Image](/media/blogs/workshop-image.jpg)

# 3. Deploy
npm run deploy
```

## 🔄 Complete Workflow: Local Edit → Live Website

### Scenario: Adding a New Team Member

#### Step 1: Prepare Content
```bash
# Add photo
cp ~/Downloads/new-student.jpg content/media/team/new-student.jpg

# Edit team file
vim content/team/team-members.yaml
# Add new member entry
```

#### Step 2: Test Locally
```bash
# Start backend
cd backend && python manage.py runserver

# Start frontend (new terminal)
npm run dev

# Visit http://localhost:3000 to preview changes
```

#### Step 3: Build Static Content
```bash
# Import changes to database
cd backend
python manage.py import_team_data

# Export to static files
python manage.py export_static_content

# Or use npm script
npm run content:build
```

#### Step 4: Deploy to Live Website
```bash
# Commit all changes
git add .
git commit -m "Add new team member: Student Name"
git push

# Vercel automatically deploys in ~2 minutes
# Check https://gcadr-website.vercel.app
```

## 🛠️ Troubleshooting

### Common Issues

#### 1. "Command not found" errors
```bash
# Make scripts executable
chmod +x scripts/*.sh

# Check if you're in project root
pwd  # Should end with "gcadr-website"
```

#### 2. Python/Django errors
```bash
# Activate virtual environment
cd backend
source venv/bin/activate  # or source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate
```

#### 3. Images not showing
```bash
# Check file paths
ls content/media/team/  # Verify image exists

# Check YAML syntax
python -c "import yaml; yaml.safe_load(open('content/team/team-members.yaml'))"

# Rebuild static content
npm run content:build
```

#### 4. Changes not appearing on live site
```bash
# Check if files are committed
git status

# Check Vercel deployment
# Visit https://vercel.com/dashboard

# Force rebuild
npm run content:build
git add .
git commit -m "Force rebuild"
git push
```

### Getting Help

#### Check Build Status
```bash
# Test build locally
npm run build

# Check for syntax errors
npm run lint
```

#### Verify Content Structure
```bash
# Check content files
find content/ -name "*.yaml" -exec python -c "import yaml; yaml.safe_load(open('{}'))" \;

# Check markdown files
find content/blogs/ -name "*.md" | head -5
```

## 📋 Quick Reference

### Essential Commands
```bash
# Setup
./scripts/quick-start.sh

# Development
npm run dev                    # Start frontend
npm run content:dev           # Start backend

# Content Management
npm run content:import        # Import files to database
npm run content:export        # Export to static files
npm run content:build         # Full build pipeline

# Deployment
npm run deploy               # Build and push to GitHub
```

### File Locations
```
content/
├── blogs/                   # Markdown blog posts
├── team/team-members.yaml   # Student team data
├── team/leadership.yaml     # Faculty data
├── config/carousel.yaml     # Homepage slides
├── config/announcements.yaml # Site announcements
└── media/                   # All images
    ├── team/               # Team photos
    ├── carousel/           # Slide images
    └── blogs/              # Blog images
```

### Access Points
- **Live Website**: https://gcadr-website.vercel.app
- **Local Website**: http://localhost:3000
- **Admin Panel**: http://localhost:8000/admin
- **Content Manager**: http://localhost:8000/content/
- **GitHub Repo**: https://github.com/aravin-dhan/gcadr-website

## 🎯 Success Checklist

Before deploying changes:
- [ ] Content looks correct locally (http://localhost:3000)
- [ ] Images load properly
- [ ] No syntax errors in YAML/Markdown files
- [ ] Static content built successfully
- [ ] Changes committed to Git
- [ ] Pushed to GitHub

Your changes will appear on the live website within 2-3 minutes of pushing to GitHub! 🚀
