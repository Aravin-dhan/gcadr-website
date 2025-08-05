from .base import *
import dj_database_url
import os

# Database - Supabase PostgreSQL
DATABASES = {
    'default': dj_database_url.parse(
        'postgresql://postgres:[YOUR-PASSWORD]@db.kyllxdsbyojzgnxwqmly.supabase.co:5432/postgres'
    )
}

# Supabase Configuration
SUPABASE_URL = 'https://kyllxdsbyojzgnxwqmly.supabase.co'
SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5bGx4ZHNieW9qemdueHdxbWx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNzkwMDMsImV4cCI6MjA2OTk1NTAwM30.c7pfIY3nkcr-01nI7vWp44RSly7bzIHyqN8Bp_Q62K8'

# Security
SECRET_KEY = os.environ.get('SECRET_KEY', 'your-super-secret-key-change-this-in-production')
DEBUG = False
ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '*.railway.app',
    '*.render.com',
    'gcadr-website.vercel.app',
    'kyllxdsbyojzgnxwqmly.supabase.co'
]

# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    "https://gcadr-website.vercel.app",
    "http://localhost:3000",
    "https://kyllxdsbyojzgnxwqmly.supabase.co",
]

CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOW_CREDENTIALS = True

# Media Files - Use Supabase Storage
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Supabase Storage Configuration
AWS_ACCESS_KEY_ID = os.environ.get('SUPABASE_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('SUPABASE_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = 'gcadr-files'
AWS_S3_ENDPOINT_URL = f'https://kyllxdsbyojzgnxwqmly.supabase.co/storage/v1/s3'
AWS_S3_REGION_NAME = 'us-east-1'
AWS_S3_CUSTOM_DOMAIN = f'kyllxdsbyojzgnxwqmly.supabase.co/storage/v1/object/public/gcadr-files'

# Media URL
MEDIA_URL = f'https://kyllxdsbyojzgnxwqmly.supabase.co/storage/v1/object/public/gcadr-files/'
MEDIA_ROOT = '/tmp/media/'

# Static Files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Additional Security
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# Logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
}
