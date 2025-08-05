# 🚀 GCADR Website - Supabase Setup Guide

## 📋 Overview
This guide will help you deploy the GCADR website backend using Supabase as your database and authentication provider.

## 🔧 Step 1: Create Supabase Project

1. **Go to [Supabase](https://supabase.com)**
2. **Sign up/Login** with your GitHub account
3. **Create New Project**:
   - Project Name: `gcadr-website`
   - Database Password: `your-secure-password`
   - Region: Choose closest to your users
4. **Wait for setup** (2-3 minutes)

## 🔧 Step 2: Get Database Connection Details

1. **Go to Settings > Database**
2. **Copy Connection String**:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

   postgresql://postgres:[YOUR-PASSWORD]@db.kyllxdsbyojzgnxwqmly.supabase.co:5432/postgres
   ```
3. **Note down**:

NEXT_PUBLIC_SUPABASE_URL=https://kyllxdsbyojzgnxwqmly.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5bGx4ZHNieW9qemdueHdxbWx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNzkwMDMsImV4cCI6MjA2OTk1NTAwM30.c7pfIY3nkcr-01nI7vWp44RSly7bzIHyqN8Bp_Q62K8

   - Project URL: `https://[PROJECT-REF].supabase.co`
   - Anon Key: `eyJ...` (from Settings > API)
   - Service Role Key: `eyJ...` (from Settings > API)

## 🔧 Step 3: Update Django Settings

Create `backend/settings/supabase.py`:

```python
from .base import *
import dj_database_url

# Database
DATABASES = {
    'default': dj_database_url.parse(
        'postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres'
    )
}

# Supabase Configuration
SUPABASE_URL = 'https://[PROJECT-REF].supabase.co'
SUPABASE_ANON_KEY = 'your-anon-key'
SUPABASE_SERVICE_KEY = 'your-service-role-key'

# CORS for Supabase
CORS_ALLOWED_ORIGINS = [
    "https://gcadr-website.vercel.app",
    "http://localhost:3000",
    "https://[PROJECT-REF].supabase.co",
]

# Static files (use Supabase Storage)
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3StaticStorage'

AWS_ACCESS_KEY_ID = 'your-supabase-access-key'
AWS_SECRET_ACCESS_KEY = 'your-supabase-secret-key'
AWS_STORAGE_BUCKET_NAME = 'your-bucket-name'
AWS_S3_ENDPOINT_URL = 'https://[PROJECT-REF].supabase.co/storage/v1/s3'
AWS_S3_REGION_NAME = 'us-east-1'
```

## 🔧 Step 4: Deploy to Railway (Alternative to Render)

1. **Go to [Railway](https://railway.app)**
2. **Connect GitHub** account
3. **New Project > Deploy from GitHub**
4. **Select** `gcadr-website` repository
5. **Configure**:
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python manage.py migrate && python manage.py collectstatic --noinput && gunicorn gcadr_backend.wsgi:application --bind 0.0.0.0:$PORT`

## 🔧 Step 5: Environment Variables (Railway)

Add these in Railway Dashboard > Variables:

```bash
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
DJANGO_SETTINGS_MODULE=gcadr_backend.settings.supabase
SECRET_KEY=your-django-secret-key
DEBUG=False
ALLOWED_HOSTS=*.railway.app,gcadr-website.vercel.app
SUPABASE_URL=https://[PROJECT-REF].supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key
```

## 🔧 Step 6: Frontend Configuration

Update `lib/api.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app') 
    ? 'https://your-railway-app.railway.app' 
    : 'http://localhost:8000')
```

Add to `next.config.js`:

```javascript
env: {
  NEXT_PUBLIC_API_URL: 'https://your-railway-app.railway.app',
  NEXT_PUBLIC_SUPABASE_URL: 'https://[PROJECT-REF].supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'your-anon-key',
}
```

## 🔧 Step 7: Supabase Storage Setup (Optional)

For file uploads (team photos, journals):

1. **Go to Storage** in Supabase Dashboard
2. **Create Bucket**: `gcadr-files`
3. **Set Policies**:
   ```sql
   -- Allow public read access
   CREATE POLICY "Public read access" ON storage.objects
   FOR SELECT USING (bucket_id = 'gcadr-files');
   
   -- Allow authenticated uploads
   CREATE POLICY "Authenticated upload" ON storage.objects
   FOR INSERT WITH CHECK (bucket_id = 'gcadr-files' AND auth.role() = 'authenticated');
   ```

## 🔧 Step 8: Create Superuser

After deployment, run in Railway console:

```bash
python manage.py shell
```

Then:

```python
from django.contrib.auth.models import User
User.objects.create_superuser('admin', 'admin@gcadr.gnlu.ac.in', 'admin123')
exit()
```

## ✅ Benefits of Supabase + Railway

- **Free Tier**: Both have generous free tiers
- **PostgreSQL**: Full-featured database
- **Real-time**: Supabase provides real-time subscriptions
- **Authentication**: Built-in auth system
- **Storage**: File storage included
- **Dashboard**: Easy data management
- **Scaling**: Auto-scaling capabilities

## 🎯 Final URLs

- **Frontend**: `https://gcadr-website.vercel.app`
- **Backend**: `https://your-app.railway.app`
- **Database**: Supabase Dashboard
- **Admin**: `https://your-app.railway.app/admin`

## 🔧 Troubleshooting

1. **Migration Issues**: Run `python manage.py migrate --fake-initial`
2. **Static Files**: Ensure `STATIC_ROOT` is set correctly
3. **CORS**: Add your domains to `CORS_ALLOWED_ORIGINS`
4. **Database**: Check connection string format
5. **Environment**: Verify all environment variables are set

This setup gives you a robust, scalable, and free hosting solution! 🚀
