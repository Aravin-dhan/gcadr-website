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

## License

This project is licensed under the MIT License.
