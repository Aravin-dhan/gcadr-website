# GCADR Website

A modern, responsive website for the Gujarat National Law University Centre for Alternative Dispute Resolution (GCADR).

## Features

- **Modern Design**: Professional, academic-focused design with dark/light mode support
- **Responsive**: Fully responsive across all devices
- **Content Management**: Django admin interface for easy content management
- **Blog System**: Dynamic blog with categories and tags
- **Event Management**: Event listings and management
- **Newsletter**: Newsletter subscription and archives
- **Contact Forms**: Contact forms with file upload support
- **Gallery**: Image gallery for events and activities
- **Publications**: Journal and newsletter archives
- **Team Management**: Leadership and team member profiles

## Tech Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Hook Form** for form handling

### Backend
- **Django 4.2** with Django REST Framework
- **PostgreSQL** database (production)
- **SQLite** database (development)
- **Django Admin** for content management

## Local Development

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- Git

### Frontend Setup
```bash
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend URL
   - `NEXT_PUBLIC_SITE_URL`: Your frontend URL
3. Deploy automatically on push to main branch

### Backend (Render)
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set build command: `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
4. Set start command: `gunicorn gcadr_backend.wsgi:application`
5. Add environment variables:
   - `DEBUG`: False
   - `SECRET_KEY`: Generate a secure key
   - `DATABASE_URL`: Provided by Render PostgreSQL
   - `ALLOWED_HOSTS`: Your Render domain
   - `CORS_ALLOWED_ORIGINS`: Your Vercel domain

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Backend (.env)
```
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## Content Management

Access the Django admin at `/admin/` to manage:
- Blog posts and categories
- Events and galleries
- Team members and leadership
- Announcements
- Newsletter archives
- Contact form submissions

## Free Deployment Guide

### Step 1: Deploy Backend to Render (Free)

1. **Sign up for Render**: Go to [render.com](https://render.com) and create a free account
2. **Connect GitHub**: Link your GitHub account to Render
3. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect your `gcadr-website` repository
   - Configure:
     - **Name**: `gcadr-backend`
     - **Environment**: `Python 3`
     - **Build Command**: `pip install -r backend/requirements.txt && cd backend && python manage.py collectstatic --noinput && python manage.py migrate`
     - **Start Command**: `cd backend && gunicorn gcadr_backend.wsgi:application`
     - **Root Directory**: Leave empty (will use repo root)

4. **Add Environment Variables**:
   ```
   DEBUG=False
   SECRET_KEY=your-generated-secret-key-here
   ALLOWED_HOSTS=your-app-name.onrender.com
   CORS_ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
   ```

5. **Add PostgreSQL Database**:
   - In Render dashboard, create a new PostgreSQL database (free tier)
   - Copy the `DATABASE_URL` and add it to your web service environment variables

### Step 2: Deploy Frontend to Vercel (Free)

1. **Sign up for Vercel**: Go to [vercel.com](https://vercel.com) and create a free account
2. **Import Project**:
   - Click "New Project"
   - Import your `gcadr-website` repository from GitHub
   - Vercel will auto-detect it's a Next.js project

3. **Configure Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-name.onrender.com
   NEXT_PUBLIC_SITE_URL=https://your-project-name.vercel.app
   ```

4. **Deploy**: Click "Deploy" - Vercel will automatically build and deploy your frontend

### Step 3: Update CORS Settings

After both deployments are live:
1. Go to your Render backend dashboard
2. Update the `CORS_ALLOWED_ORIGINS` environment variable with your actual Vercel URL
3. Restart the backend service

### Step 4: Access Your Live Website

- **Frontend**: `https://your-project-name.vercel.app`
- **Backend Admin**: `https://your-backend-name.onrender.com/admin/`
- **API**: `https://your-backend-name.onrender.com/api/`

### Step 5: Create Admin User

1. Go to your Render backend dashboard
2. Open the "Shell" tab
3. Run: `python manage.py createsuperuser`
4. Follow the prompts to create an admin user

## Repository Information

- **GitHub Repository**: [https://github.com/Aravin-dhan/gcadr-website](https://github.com/Aravin-dhan/gcadr-website)
- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Backend**: Django 4.2 with Django REST Framework
- **Database**: PostgreSQL (production) / SQLite (development)

## Features Implemented

### ✅ **Logo Integration**
- **GCADR Golden Logo**: Used in navigation header with rounded corners
- **GCADR Text Logo**: Featured prominently on homepage hero section
- **GNLU Logo**: Added to homepage with university badge

### ✅ **Comprehensive Dark Mode**
- **Smart Theme Detection**: Respects system preferences
- **Manual Toggle**: Theme switcher in navigation
- **Complete Coverage**: All components properly styled for dark mode
- **Persistent**: User preference saved in localStorage

### ✅ **Navigation Color Scheme**
- **Light Mode**: "About Us", "Publications", "Events & Activities" in golden
- **Dark Mode**: All navigation items in golden for consistency
- **Professional**: Maintains academic formality

### ✅ **Content Management**
- **Newsletter Archives**: Complete system with backend and frontend
- **Announcements**: Dynamic content with search and filtering
- **Image Carousel**: Homepage carousel with backend management
- **Blog System**: Full blog with categories and tags
- **Contact Forms**: File upload support and admin visibility

### ✅ **Design Improvements**
- **Typography**: Professional Playfair Display + Inter combination
- **Shadows Removed**: Clean, modern appearance on About page
- **Text Justification**: Improved readability on About page
- **Color Consistency**: Dark blue for gallery, proper contrast throughout

## License

This project is licensed under the MIT License.
