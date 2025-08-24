# 📝 GCADR Content Management System

This directory contains all the content for the GCADR website that can be managed without a running backend server.

## 📁 Directory Structure

```
content/
├── blogs/                  # Markdown blog posts
│   ├── 2024-01-15-welcome-to-gcadr.md
│   └── 2024-02-01-arbitration-workshop.md
├── team/                   # Team member data
│   ├── team-members.yaml   # Student team data
│   └── leadership.yaml     # Faculty/staff data
├── pages/                  # Static page content
│   ├── about.yaml
│   └── arbitration-week.yaml
├── media/                  # Images and files
│   ├── team/              # Team member photos
│   ├── carousel/          # Homepage carousel images
│   ├── blogs/             # Blog post images
│   └── events/            # Event photos
└── config/                # Site configuration
    ├── navigation.yaml    # Menu structure
    ├── carousel.yaml      # Homepage carousel
    └── announcements.yaml # Site announcements
```

## ✍️ Creating Blog Posts

### 1. Create a new markdown file in `content/blogs/`

**Filename format:** `YYYY-MM-DD-title-slug.md`

**Example:** `2024-03-15-new-arbitration-course.md`

### 2. Add frontmatter (metadata) at the top:

```yaml
---
title: "New Arbitration Course Launched"
date: "2024-03-15"
author: "Dr. Vikas Gandhi"
category: "Education"
tags: ["arbitration", "course", "education"]
featured: true
published: true
excerpt: "GCADR launches comprehensive arbitration course for law students"
featured_image: "/media/blogs/arbitration-course-banner.jpg"
---
```

### 3. Write your content in markdown:

```markdown
# Course Overview

We are excited to announce the launch of our new **Arbitration Fundamentals** course.

## Key Features

- Interactive case studies
- Expert guest lectures
- Practical training sessions

![Course Image](/media/blogs/arbitration-course-image.jpg)

For more information, contact us at [gcadr@gnlu.ac.in](mailto:gcadr@gnlu.ac.in).
```

## 👥 Managing Team Members

Edit `content/team/team-members.yaml`:

```yaml
team_members:
  - id: 1
    name: "Garvita Bhatt"
    position: "Convenor"
    year: "2020 – 2025"
    email: "garvita@gnlu.ac.in"
    linkedin_url: "https://linkedin.com/in/garvita-bhatt"
    image: "/media/team/garvita-bhatt.jpg"
    bio: "Passionate about alternative dispute resolution"
    order: 1
    active: true

  - id: 2
    name: "Tahir Syed"
    position: "Co-convenor"
    year: "2021 – 2026"
    linkedin_url: "https://linkedin.com/in/tahir-syed"
    image: "/media/team/tahir-syed.jpg"
    order: 2
    active: true
```

## 🖼️ Managing Photos

### Team Photos
1. Add photos to `content/media/team/`
2. Use format: `firstname-lastname.jpg`
3. Recommended size: 400x400px (square)

### Carousel Images
1. Add images to `content/media/carousel/`
2. Edit `content/config/carousel.yaml`:

```yaml
carousel_images:
  - id: 1
    title: "Welcome to GCADR"
    description: "Leading center for alternative dispute resolution"
    image: "/media/carousel/welcome-banner.jpg"
    title_color: "white"
    show_title: true
    link_url: "/about"
    order: 1
    active: true
```

## 📢 Managing Announcements

Edit `content/config/announcements.yaml`:

```yaml
announcements:
  - id: 1
    title: "Workshop Registration Open"
    content: "Register now for our upcoming arbitration workshop"
    type: "event"
    featured: true
    published_date: "2024-03-15"
    active: true

  - id: 2
    title: "New Research Publication"
    content: "Latest research on mediation practices published"
    type: "news"
    featured: false
    published_date: "2024-03-10"
    active: true
```

## 🚀 Publishing Workflow

### Method 1: Using Local Backend (Recommended)

1. **Start local backend:**
   ```bash
   cd backend
   python manage.py runserver
   ```

2. **Import your content:**
   ```bash
   python manage.py import_markdown_blogs
   python manage.py import_team_data
   python manage.py import_config_data
   ```

3. **Export to static files:**
   ```bash
   python manage.py export_static_content
   ```

4. **Commit and push:**
   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```

### Method 2: Direct File Editing

1. **Edit static files directly in `public/api/`**
2. **Update images in `public/media/`**
3. **Commit and push changes**

## 🎨 Design Guidelines

### Image Specifications
- **Team photos:** 400x400px, JPG/PNG
- **Carousel images:** 1200x600px, JPG/PNG
- **Blog images:** 800x400px, JPG/PNG
- **File size:** Keep under 1MB

### Content Guidelines
- **Blog posts:** 500-2000 words
- **Excerpts:** 150-200 characters
- **Titles:** Clear and descriptive
- **Tags:** Use existing tags when possible

## 🔧 Troubleshooting

### Images not showing?
1. Check file path in YAML/markdown
2. Ensure image exists in `content/media/`
3. Run export command to copy to `public/media/`

### Blog not appearing?
1. Check `published: true` in frontmatter
2. Verify date format: `YYYY-MM-DD`
3. Run import command

### Team member not showing?
1. Check `active: true` in YAML
2. Verify image path
3. Run import command

This system gives you complete control over your content while maintaining the professional appearance of your website! 🚀
