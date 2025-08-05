from django.core.management.base import BaseCommand
from core.models import Leadership

class Command(BaseCommand):
    help = 'Add leadership members'

    def handle(self, *args, **options):
        # Clear existing leadership
        Leadership.objects.all().delete()
        
        # Add new leadership members
        Leadership.objects.create(
            name="Prof. (Dr.) S. Shanthakumar",
            position="Director Gujarat National Law University, Gandhinagar",
            bio="Prof. (Dr.) S. Shanthakumar is the Director, Gujarat National Law University with about 30 years of teaching experience at prestigious universities including Hidayatullah National Law University. Prof. Shanthakumar is holding in charge as the Director of Gujarat Maritime University and also appointed as the President of Gujarat International Maritime Arbitration Centre.",
            email="vc@gnlu.ac.in",
            order=1
        )
        
        Leadership.objects.create(
            name="Dr. Nitin Malik",
            position="Registrar Gujarat National Law University, Gandhinagar",
            bio="Dr. Nitin Malik serves as the Registrar of Gujarat National Law University, bringing extensive administrative and academic experience to the institution.",
            email="registrar@gnlu.ac.in",
            order=2
        )
        
        Leadership.objects.create(
            name="Prof. (Dr.) Vikas Gandhi",
            position="Faculty Convenor, GCADR",
            bio="Prof. (Dr.) Vikas Gandhi is the Faculty Convenor of GCADR and has been instrumental in establishing and developing the Centre's programs and initiatives.",
            email="gcadr@gnlu.ac.in",
            order=3
        )
        
        self.stdout.write(self.style.SUCCESS('Successfully added leadership members'))
