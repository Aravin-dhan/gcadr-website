# 📝 GCADR Content Management Guide

This guide will help you manage your GCADR website content easily without needing a constantly running backend server.

## 🎯 Overview

Your website now supports **hybrid content management**:
- ✅ **Local Backend**: Use Django admin for complex editing
- ✅ **File-based**: Edit markdown and YAML files directly
- ✅ **Static Generation**: Export content to static files
- ✅ **Zero Cost**: No ongoing server costs

## 🚀 Quick Start

### 1. Initial Setup

```bash
# Clone your repository
git clone https://github.com/aravin-dhan/gcadr-website.git
cd gcadr-website

# Make build script executable
chmod +x scripts/build-static-content.sh

# Run the build script (this will set up everything)
./scripts/build-static-content.sh
```

### 2. Start Local Development

```bash
# Start backend (for admin interface)
cd backend
python manage.py runserver

# In another terminal, start frontend
cd ..
npm run dev
```

Now you can:
- **Admin Panel**: http://localhost:8000/admin (admin/admin123)
- **Website**: http://localhost:3000

## ✍️ Content Management Workflows

### Method 1: Easy File Editing (Recommended)

#### Adding a Blog Post

1. **Create markdown file** in `content/blogs/`:
   ```bash
   # Filename format: YYYY-MM-DD-title-slug.md
   touch content/blogs/2024-03-20-new-workshop-announcement.md
   ```

2. **Add content**:
   ```markdown
   ---
   title: "New Workshop on Commercial Arbitration"
   date: "2024-03-20"
   author: "Dr. Vikas Gandhi"
   category: "Events"
   tags: ["workshop", "arbitration", "commercial"]
   featured: true
   published: true
   excerpt: "Join us for an intensive workshop on commercial arbitration"
   featured_image: "/media/blogs/workshop-banner.jpg"
   ---

   # Workshop Details

   We are excited to announce our upcoming workshop...
   ```

3. **Add images** to `content/media/blogs/`

4. **Build and deploy**:
   ```bash
   ./scripts/build-static-content.sh
   git add .
   git commit -m "Add new workshop blog post"
   git push
   ```

#### Updating Team Members

1. **Edit** `content/team/team-members.yaml`:
   ```yaml
   team_members:
     - id: 13
       name: "New Student Name"
       position: "Research Assistant"
       year: "2023 – 2028"
       email: "student@gnlu.ac.in"
       linkedin_url: "https://linkedin.com/in/student"
       image: "/media/team/new-student.jpg"
       bio: "Passionate about ADR research"
       order: 13
       active: true
   ```

2. **Add photo** to `content/media/team/new-student.jpg`

3. **Build and deploy**:
   ```bash
   ./scripts/build-static-content.sh
   git add .
   git commit -m "Add new team member"
   git push
   ```

#### Updating Homepage Carousel

1. **Edit** `content/config/carousel.yaml`:
   ```yaml
   carousel_images:
     - id: 5
       title: "New Event Announcement"
       description: "Exciting new event coming soon"
       image: "/media/carousel/new-event.jpg"
       title_color: "golden"
       show_title: true
       link_url: "/events/new-event"
       order: 5
       active: true
   ```

2. **Add image** to `content/media/carousel/new-event.jpg`

3. **Build and deploy**

### Method 2: Admin Interface

1. **Start local backend**:
   ```bash
   cd backend
   python manage.py runserver
   ```

2. **Access admin**: http://localhost:8000/admin

3. **Make changes** through the web interface

4. **Export to static**:
   ```bash
   python manage.py export_static_content
   ```

5. **Commit and push**

## 📁 File Structure

```
gcadr-website/
├── content/                    # Your content files
│   ├── blogs/                 # Markdown blog posts
│   ├── team/                  # Team member YAML files
│   ├── config/                # Site configuration
│   └── media/                 # Images and files
├── public/                    # Generated static files
│   ├── api/                   # Static JSON files
│   └── media/                 # Copied media files
├── scripts/                   # Build scripts
└── backend/                   # Django backend
```

## 🖼️ Image Management

### Image Specifications
- **Team photos**: 400x400px (square), under 500KB
- **Carousel images**: 1200x600px (2:1 ratio), under 1MB
- **Blog images**: 800x400px (2:1 ratio), under 800KB
- **Formats**: JPG, PNG, WebP

### Adding Images

1. **Place images** in appropriate `content/media/` subdirectory
2. **Reference in content** using `/media/` path
3. **Run build script** to copy to public directory

### Image Optimization Tips
- Use online tools like TinyPNG for compression
- Convert to WebP for better performance
- Use descriptive filenames (no spaces, use hyphens)

## 🔧 Advanced Features

### Custom Pages

1. **Create page content** in `content/pages/`
2. **Add to navigation** in `content/config/navigation.yaml`
3. **Create Next.js page** in `app/` directory

### Announcements

Edit `content/config/announcements.yaml`:
```yaml
announcements:
  - id: 1
    title: "Important Announcement"
    content: "Details about the announcement"
    type: "news"  # news, event, deadline, general
    featured: true
    published_date: "2024-03-20"
    active: true
```

### SEO and Metadata

Add to blog post frontmatter:
```yaml
seo_title: "Custom SEO Title"
seo_description: "Custom meta description"
keywords: ["keyword1", "keyword2"]
```

## 🚀 Deployment

### Automatic Deployment (Vercel)

1. **Push to GitHub**: Changes automatically deploy
2. **Check deployment**: Visit your Vercel URL
3. **Monitor**: Check Vercel dashboard for build status

### Manual Deployment

1. **Build static content**: `./scripts/build-static-content.sh`
2. **Test locally**: `npm run dev`
3. **Commit changes**: `git add . && git commit -m "Update content"`
4. **Push**: `git push`

## 🔍 Troubleshooting

### Content Not Showing?

1. **Check file format**: Ensure YAML/Markdown syntax is correct
2. **Run build script**: `./scripts/build-static-content.sh`
3. **Check console**: Look for errors in browser console
4. **Verify paths**: Ensure image paths are correct

### Images Not Loading?

1. **Check file location**: Images should be in `content/media/`
2. **Check file size**: Keep under recommended limits
3. **Run build script**: Copies images to `public/media/`
4. **Check paths**: Use `/media/` prefix in content

### Build Script Errors?

1. **Check Python**: Ensure Python 3.8+ is installed
2. **Check dependencies**: Run `pip install -r backend/requirements.txt`
3. **Check permissions**: Make script executable with `chmod +x`
4. **Check paths**: Ensure you're in the project root directory

## 💡 Tips for Success

### Content Best Practices
- **Write clear titles**: Descriptive and SEO-friendly
- **Use excerpts**: Provide compelling summaries
- **Tag consistently**: Use existing tags when possible
- **Optimize images**: Compress before uploading

### Workflow Tips
- **Test locally**: Always test before pushing
- **Commit frequently**: Small, focused commits
- **Use descriptive messages**: Clear commit messages
- **Backup content**: Keep local copies of important content

### Performance Tips
- **Optimize images**: Use appropriate sizes and formats
- **Minimize content**: Remove unused files
- **Monitor build times**: Keep content reasonable in size

## 📞 Support

If you need help:
1. **Check this guide**: Most issues are covered here
2. **Check console errors**: Browser developer tools
3. **Test locally**: Reproduce issues in development
4. **Document issues**: Note exact error messages

Your GCADR website is now fully self-managed with zero ongoing costs! 🎉
