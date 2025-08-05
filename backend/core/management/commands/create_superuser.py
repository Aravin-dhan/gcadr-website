from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = 'Create a superuser with predefined credentials'

    def handle(self, *args, **options):
        username = 'admin'
        email = 'admin@gcadr.gnlu.ac.in'
        password = 'admin123'

        if User.objects.filter(username=username).exists():
            self.stdout.write(
                self.style.WARNING(f'User "{username}" already exists.')
            )
        else:
            User.objects.create_superuser(username, email, password)
            self.stdout.write(
                self.style.SUCCESS(f'Superuser "{username}" created successfully.')
            )
