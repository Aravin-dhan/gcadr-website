from django.core.wsgi import get_wsgi_application
import os
import sys
from pathlib import Path

# Add backend to Python path
backend_path = str(Path(__file__).parent.parent / 'backend')
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

# Set Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gcadr_backend.settings')

# Get WSGI application
application = get_wsgi_application()

# Vercel handler
def handler(request):
    return application(request)
