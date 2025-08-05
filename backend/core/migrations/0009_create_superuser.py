from django.db import migrations
from django.contrib.auth.models import User


def create_superuser(apps, schema_editor):
    """Create superuser if it doesn't exist"""
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser(
            username='admin',
            email='admin@gcadr.gnlu.ac.in',
            password='admin123'
        )


def reverse_create_superuser(apps, schema_editor):
    """Remove superuser"""
    User.objects.filter(username='admin').delete()


class Migration(migrations.Migration):
    dependencies = [
        ('core', '0008_newsletterarchive'),
    ]

    operations = [
        migrations.RunPython(create_superuser, reverse_create_superuser),
    ]
