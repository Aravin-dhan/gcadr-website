from django.core.management.base import BaseCommand
from core.models import Announcement
from datetime import datetime, timedelta

class Command(BaseCommand):
    help = 'Populate sample announcements'

    def handle(self, *args, **options):
        # Clear existing announcements
        Announcement.objects.all().delete()
        
        # Create sample announcements
        announcements_data = [
            {
                'title': 'Annual Arbitration Week 2025',
                'content': 'Join us for our flagship event featuring renowned experts in alternative dispute resolution from March 24-28, 2025. This comprehensive program will cover the latest developments in arbitration, mediation, and other ADR mechanisms.',
                'announcement_type': 'event',
                'is_featured': True,
                'order': 1
            },
            {
                'title': 'GALR Journal Submission Deadline Extended',
                'content': 'The submission deadline for Volume 2, Issue 2 of the Gujarat ADR Law Review has been extended to April 15, 2025. We encourage researchers and practitioners to submit their high-quality papers.',
                'announcement_type': 'deadline',
                'is_featured': True,
                'order': 2
            },
            {
                'title': 'New Certificate Course in Commercial Mediation',
                'content': 'GCADR is pleased to announce the launch of a new certificate course in commercial mediation. Registration is now open for the February 2025 batch. Limited seats available.',
                'announcement_type': 'news',
                'is_featured': False,
                'order': 3
            },
            {
                'title': 'Research Collaboration with International ADR Institute',
                'content': 'GCADR has entered into a research collaboration agreement with the International Institute for Alternative Dispute Resolution to advance cross-border ADR research.',
                'announcement_type': 'news',
                'is_featured': False,
                'order': 4
            },
            {
                'title': 'Student Research Paper Competition 2025',
                'content': 'Applications are now open for the annual student research paper competition. Cash prizes and publication opportunities available for winning entries. Deadline: March 1, 2025.',
                'announcement_type': 'deadline',
                'is_featured': False,
                'order': 5
            },
            {
                'title': 'Guest Lecture Series on International Arbitration',
                'content': 'Join us for a series of guest lectures by leading international arbitration practitioners. Sessions will be held every Friday in February 2025.',
                'announcement_type': 'event',
                'is_featured': False,
                'order': 6
            }
        ]
        
        for data in announcements_data:
            Announcement.objects.create(**data)
            self.stdout.write(
                self.style.SUCCESS(f'Successfully created announcement: {data["title"]}')
            )
        
        self.stdout.write(
            self.style.SUCCESS('Successfully populated announcements data')
        )
