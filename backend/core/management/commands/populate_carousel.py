from django.core.management.base import BaseCommand
from core.models import CarouselImage

class Command(BaseCommand):
    help = 'Populate sample carousel images'

    def handle(self, *args, **options):
        # Clear existing carousel images
        CarouselImage.objects.all().delete()
        
        # Create sample carousel images
        carousel_data = [
            {
                'title': 'GCADR Research Excellence',
                'description': 'Leading research in alternative dispute resolution and legal innovation. Our center conducts cutting-edge research that shapes the future of ADR practices.',
                'image': 'carousel_images/research-excellence.jpg',
                'link_url': '/publications',
                'is_active': True,
                'order': 1
            },
            {
                'title': 'Annual Arbitration Week 2025',
                'description': 'Join us for our flagship event featuring renowned experts from around the world. A week-long celebration of arbitration and mediation excellence.',
                'image': 'carousel_images/arbitration-week.jpg',
                'link_url': '/events/arbitration-week',
                'is_active': True,
                'order': 2
            },
            {
                'title': 'GNLU Campus Excellence',
                'description': 'State-of-the-art facilities supporting world-class legal education. Experience learning in one of India\'s premier law universities.',
                'image': 'carousel_images/campus-excellence.jpg',
                'link_url': '/about',
                'is_active': True,
                'order': 3
            },
            {
                'title': 'International Collaborations',
                'description': 'Building bridges with leading institutions worldwide. Our global partnerships enhance research and educational opportunities.',
                'image': 'carousel_images/international-collab.jpg',
                'link_url': '/work-with-us/collaborations',
                'is_active': True,
                'order': 4
            },
            {
                'title': 'Student Success Stories',
                'description': 'Celebrating the achievements of our students and alumni in the field of alternative dispute resolution.',
                'image': 'carousel_images/student-success.jpg',
                'link_url': '/about/team',
                'is_active': True,
                'order': 5
            }
        ]
        
        for data in carousel_data:
            CarouselImage.objects.create(**data)
            self.stdout.write(
                self.style.SUCCESS(f'Successfully created carousel image: {data["title"]}')
            )
        
        self.stdout.write(
            self.style.SUCCESS('Successfully populated carousel images')
        )
