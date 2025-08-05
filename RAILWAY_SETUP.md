# 🚀 GCADR Website - Railway Deployment Guide

## 📋 Quick Railway Setup (Easiest Option)

Railway is often easier than Render for Django projects. Here's how to set it up:

## 🔧 Step 1: Create Railway Account

1. **Go to [Railway](https://railway.app)**
2. **Sign up** with GitHub account
3. **Verify** your account (may need phone verification)

## 🔧 Step 2: Deploy Backend

1. **Dashboard > New Project**
2. **Deploy from GitHub repo**
3. **Select** `Aravin-dhan/gcadr-website`
4. **Configure Service**:
   - Name: `gcadr-backend`
   - Root Directory: `backend`

## 🔧 Step 3: Add PostgreSQL Database

1. **In your project** > Add Service
2. **Database** > PostgreSQL
3. **Railway will automatically**:
   - Create database
   - Set `DATABASE_URL` environment variable
   - Connect to your backend service

## 🔧 Step 4: Environment Variables

Add these in Railway Dashboard > Variables:

```bash
# Django Settings
DJANGO_SETTINGS_MODULE=gcadr_backend.settings.production
SECRET_KEY=your-super-secret-django-key-here
DEBUG=False
ALLOWED_HOSTS=*.railway.app,gcadr-website.vercel.app,localhost

# Database (automatically set by Railway)
DATABASE_URL=postgresql://postgres:password@host:port/database

# CORS
CORS_ALLOWED_ORIGINS=https://gcadr-website.vercel.app,http://localhost:3000

# Static Files
STATIC_URL=/static/
STATIC_ROOT=/app/staticfiles/
```

## 🔧 Step 5: Build Configuration

Railway auto-detects Python. Create `railway.toml` in backend folder:

```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "python manage.py migrate && python manage.py collectstatic --noinput && python manage.py create_superuser && gunicorn gcadr_backend.wsgi:application --bind 0.0.0.0:$PORT"
```

## 🔧 Step 6: Update Frontend API URL

Update `lib/api.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app') 
    ? 'https://gcadr-backend-production.up.railway.app' 
    : 'http://localhost:8000')
```

## 🔧 Step 7: Deploy and Test

1. **Push changes** to GitHub
2. **Railway auto-deploys** from main branch
3. **Check logs** in Railway dashboard
4. **Test API** at your Railway URL

## 🎯 Alternative: One-Click Railway Deploy

Create `railway.json` in root:

```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "cd backend && python manage.py migrate && python manage.py collectstatic --noinput && gunicorn gcadr_backend.wsgi:application --bind 0.0.0.0:$PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

## ✅ Railway Advantages

- **Simpler Setup**: Less configuration than Render
- **Auto Database**: PostgreSQL included
- **Better Logs**: Easier debugging
- **Faster Builds**: Usually quicker than Render
- **Free Tier**: $5 credit monthly
- **GitHub Integration**: Auto-deploy on push

## 🔧 Create Superuser on Railway

After deployment:

1. **Railway Dashboard** > Your Service
2. **Connect** (opens terminal)
3. **Run**:
   ```bash
   python manage.py shell
   ```
4. **Create user**:
   ```python
   from django.contrib.auth.models import User
   User.objects.create_superuser('admin', 'admin@gcadr.gnlu.ac.in', 'admin123')
   exit()
   ```

## 🎯 Final Setup

Your URLs will be:
- **Backend**: `https://gcadr-backend-production.up.railway.app`
- **Admin**: `https://gcadr-backend-production.up.railway.app/admin`
- **API**: `https://gcadr-backend-production.up.railway.app/api/`

## 🔧 Troubleshooting

1. **Build Fails**: Check `requirements.txt` path
2. **Database Issues**: Verify `DATABASE_URL` is set
3. **Static Files**: Ensure `STATIC_ROOT` is configured
4. **CORS**: Add your Vercel domain to allowed origins
5. **Migrations**: May need to run manually in console

Railway is generally more reliable than Render for Django projects! 🚀
