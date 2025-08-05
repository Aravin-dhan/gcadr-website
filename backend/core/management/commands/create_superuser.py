from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
import os


class Command(BaseCommand):
    help = 'Create a superuser with predefined credentials'

    def handle(self, *args, **options):
        username = 'admin'
        email = 'admin@gcadr.gnlu.ac.in'
        password = 'admin123'

        try:
            if User.objects.filter(username=username).exists():
                self.stdout.write(
                    self.style.WARNING(f'User "{username}" already exists.')
                )
            else:
                User.objects.create_superuser(username, email, password)
                self.stdout.write(
                    self.style.SUCCESS(f'Superuser "{username}" created successfully.')
                )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error creating superuser: {e}')
            )
            # Force create anyway
            try:
                user = User(username=username, email=email, is_staff=True, is_superuser=True)
                user.set_password(password)
                user.save()
                self.stdout.write(
                    self.style.SUCCESS(f'Superuser "{username}" force created.')
                )
            except Exception as e2:
                self.stdout.write(
                    self.style.ERROR(f'Force creation also failed: {e2}')
                )
