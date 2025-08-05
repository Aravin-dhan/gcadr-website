# 🔐 GCADR Backend Access Guide

## 📋 How to Access Your Backend

### **Option 1: Render (Current Setup)**
1. **Backend URL**: `https://gcadr-website.onrender.com`
2. **Admin Panel**: `https://gcadr-website.onrender.com/admin`
3. **Login**: `admin` / `admin123` (auto-created via migration)

### **Option 2: Railway (Recommended)**
1. **Deploy to Railway**: Follow `RAILWAY_SETUP.md`
2. **Admin Panel**: `https://your-app.railway.app/admin`
3. **Login**: `admin` / `admin123`

### **Option 3: Supabase + Railway**
1. **Follow**: `SUPABASE_SETUP.md` guide
2. **Database**: Supabase PostgreSQL
3. **Backend**: Railway hosting
4. **Admin Panel**: `https://your-app.railway.app/admin`

## 🖼️ **Image Upload Solution**

### **Problem**: Images not showing on Vercel
The issue is that Render's file storage is **ephemeral** - uploaded files get deleted on each deployment.

### **Solutions**:

#### **Option A: Use Supabase Storage (Recommended)**
1. **Setup Supabase** (follow SUPABASE_SETUP.md)
2. **Create bucket** named `gcadr-files`
3. **Update settings** to use Supabase storage
4. **Images persist** across deployments

#### **Option B: Use Cloudinary (Free)**
1. **Sign up**: [Cloudinary](https://cloudinary.com)
2. **Install**: `pip install cloudinary`
3. **Add to requirements.txt**: `cloudinary==1.36.0`
4. **Update settings**:
   ```python
   import cloudinary
   import cloudinary.uploader
   import cloudinary.api

   cloudinary.config(
       cloud_name='your-cloud-name',
       api_key='your-api-key',
       api_secret='your-api-secret'
   )

   DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
   ```

#### **Option C: Use AWS S3 (Professional)**
1. **Create S3 bucket**
2. **Install**: `pip install boto3 django-storages`
3. **Configure** AWS credentials
4. **Update settings** for S3 storage

## 📁 **Where to Add Images in Backend**

### **Current Structure**:
```
backend/
├── media/
│   ├── team_images/          # Team member photos
│   ├── leadership_images/    # Leadership photos  
│   ├── carousel_images/      # Homepage carousel
│   ├── blog_images/          # Blog post images
│   ├── event_images/         # Event photos
│   └── gallery_images/       # Gallery photos
```

### **How to Add Images**:

1. **Login to Admin**: `https://your-backend-url/admin`
2. **Navigate to Models**:
   - **Team Members** → Upload in `image` field
   - **Leadership** → Upload in `image` field
   - **Carousel Images** → Upload in `image` field
   - **Blog Posts** → Upload in `featured_image` field

3. **Image URLs**: Backend automatically generates proper URLs
   - **Local**: `http://localhost:8000/media/team_images/photo.jpg`
   - **Production**: `https://your-backend.com/media/team_images/photo.jpg`

## 🔧 **Backend Data Management**

### **Available Models**:
- ✅ **Team Members**: Student leadership with photos
- ✅ **Leadership**: Faculty and staff
- ✅ **Announcements**: News, events, deadlines
- ✅ **Carousel Images**: Homepage slideshow
- ✅ **Blog Posts**: Publications and articles
- ✅ **Events**: Workshops, seminars, conferences
- ✅ **Galleries**: Photo collections
- ✅ **Newsletter Archives**: PDF downloads

### **No More Mock Data**:
All components now fetch from backend:
- ✅ **Homepage carousel** → `/api/carousel/`
- ✅ **Announcements** → `/api/announcements/`
- ✅ **Team members** → `/api/team/`
- ✅ **Leadership** → `/api/leadership/`
- ✅ **Blog posts** → `/api/blogs/`
- ✅ **Events** → `/api/events/`

## 🚀 **Quick Setup Commands**

### **Populate Sample Data**:
```bash
# In Railway/Render console
python manage.py populate_announcements
python manage.py populate_carousel
python manage.py populate_team
```

### **Create Additional Superuser**:
```bash
python manage.py createsuperuser
```

### **Check Database**:
```bash
python manage.py shell
>>> from core.models import TeamMember, Announcement
>>> TeamMember.objects.count()
>>> Announcement.objects.count()
```

## 🎯 **Image Best Practices**

1. **Recommended Sizes**:
   - **Team photos**: 400x400px (square)
   - **Carousel images**: 1200x600px (2:1 ratio)
   - **Blog images**: 800x400px (2:1 ratio)

2. **File Formats**: JPG, PNG, WebP
3. **File Size**: Keep under 1MB for fast loading
4. **Alt Text**: Always add descriptive alt text

## 🔍 **Troubleshooting**

### **Images Not Showing**:
1. **Check file upload** in admin panel
2. **Verify URL** in API response
3. **Check CORS** settings
4. **Use Supabase Storage** for persistence

### **API Not Working**:
1. **Check backend URL** in frontend
2. **Verify CORS** configuration
3. **Check migration** status
4. **Review server logs**

Your backend is now fully configured for dynamic content management! 🎉
