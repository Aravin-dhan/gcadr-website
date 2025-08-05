from django.core.management.base import BaseCommand
from core.models import Leadership

class Command(BaseCommand):
    help = 'Populate leadership data'

    def handle(self, *args, **options):
        # Clear existing leadership data
        Leadership.objects.all().delete()
        
        # Create leadership members
        leadership_data = [
            {
                'name': 'Prof. (Dr.) Sanjeevi Shanthakumar',
                'position': 'Director, GNLU',
                'bio': 'Prof. (Dr.) Sanjeevi Shanthakumar serves as the Director of Gujarat National Law University. Under his visionary leadership, GNLU has achieved remarkable growth and recognition in legal education and research.',
                'email': 'director@gnlu.ac.in',
                'order': 1
            },
            {
                'name': 'Prof. (Dr.) Nitin Malik',
                'position': 'Registrar, GNLU',
                'bio': 'Prof. (Dr.) Nitin Malik is the Registrar of Gujarat National Law University, bringing extensive experience in academic administration and legal education.',
                'email': 'registrar@gnlu.ac.in',
                'order': 2
            },
            {
                'name': 'Prof. (Dr.) Vikas Gandhi',
                'position': 'Faculty Convenor, GCADR',
                'bio': 'Prof. (Dr.) Vikas Gandhi is the Faculty Convenor of the GNLU Centre for Alternative Dispute Resolution. Under his distinguished leadership, GCADR has emerged as a premier education hub for ADR training, providing specialized training and promoting a culture of dispute resolution through conferences, workshops, and competitions. He has successfully created and sustainably developed a vibrant culture of ADR within the University and beyond.',
                'email': 'vikas.gandhi@gnlu.ac.in',
                'order': 3
            }
        ]
        
        for data in leadership_data:
            Leadership.objects.create(**data)
            self.stdout.write(
                self.style.SUCCESS(f'Successfully created leadership entry for {data["name"]}')
            )
        
        self.stdout.write(
            self.style.SUCCESS('Successfully populated leadership data')
        )
