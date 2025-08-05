# Vercel serverless function for Django
import os
import sys
from pathlib import Path

# Add the backend directory to Python path
backend_dir = Path(__file__).parent.parent / 'backend'
sys.path.insert(0, str(backend_dir))

# Set Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gcadr_backend.settings')

# Import Django WSGI application
from django.core.wsgi import get_wsgi_application
from django.core.management import execute_from_command_line

# Initialize Django
application = get_wsgi_application()

# Vercel handler
def handler(request, response):
    return application(request, response)
