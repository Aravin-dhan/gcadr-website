import os
import yaml
from datetime import datetime
from django.core.management.base import BaseCommand
from core.models import CarouselImage, Announcement


class Command(BaseCommand):
    help = 'Import configuration data from YAML files'

    def add_arguments(self, parser):
        parser.add_argument(
            '--content-dir',
            type=str,
            default='../content/config',
            help='Directory containing configuration YAML files'
        )

    def handle(self, *args, **options):
        content_dir = options['content_dir']
        
        if not os.path.exists(content_dir):
            self.stdout.write(
                self.style.ERROR(f'Content directory {content_dir} does not exist')
            )
            return
        
        self.stdout.write(f'Importing configuration data from {content_dir}...')
        
        # Import carousel images
        carousel_file = os.path.join(content_dir, 'carousel.yaml')
        if os.path.exists(carousel_file):
            self.import_carousel_images(carousel_file)
        
        # Import announcements
        announcements_file = os.path.join(content_dir, 'announcements.yaml')
        if os.path.exists(announcements_file):
            self.import_announcements(announcements_file)
        
        self.stdout.write(self.style.SUCCESS('✅ Configuration data import completed!'))

    def import_carousel_images(self, filepath):
        """Import carousel images from YAML file"""
        with open(filepath, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)
        
        carousel_images = data.get('carousel_images', [])
        imported_count = 0
        
        for image_data in carousel_images:
            try:
                image_id = image_data.get('id')
                
                # Create or update carousel image
                carousel_image, created = CarouselImage.objects.update_or_create(
                    id=image_id,
                    defaults={
                        'title': image_data.get('title', ''),
                        'description': image_data.get('description', ''),
                        'link_url': image_data.get('link_url', ''),
                        'title_color': image_data.get('title_color', 'white'),
                        'show_title': image_data.get('show_title', True),
                        'is_active': image_data.get('active', True),
                        'order': image_data.get('order', 0),
                    }
                )
                
                # Handle image path
                image_path = image_data.get('image', '')
                if image_path and not carousel_image.image:
                    carousel_image.image = image_path.replace('/media/', '')
                    carousel_image.save()
                
                imported_count += 1
                action = "Created" if created else "Updated"
                self.stdout.write(f'✅ {action}: {carousel_image.title}')
                
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f'❌ Failed to import carousel image {image_data.get("title", "Unknown")}: {str(e)}')
                )
        
        self.stdout.write(f'🖼️ Imported {imported_count} carousel images')

    def import_announcements(self, filepath):
        """Import announcements from YAML file"""
        with open(filepath, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)
        
        announcements = data.get('announcements', [])
        imported_count = 0
        
        for announcement_data in announcements:
            try:
                announcement_id = announcement_data.get('id')
                
                # Parse date
                date_str = announcement_data.get('published_date')
                if isinstance(date_str, str):
                    published_date = datetime.strptime(date_str, '%Y-%m-%d')
                else:
                    published_date = date_str or datetime.now()
                
                # Create or update announcement
                announcement, created = Announcement.objects.update_or_create(
                    id=announcement_id,
                    defaults={
                        'title': announcement_data.get('title', ''),
                        'content': announcement_data.get('content', ''),
                        'announcement_type': announcement_data.get('type', 'general'),
                        'is_featured': announcement_data.get('featured', False),
                        'is_active': announcement_data.get('active', True),
                        'published_date': published_date,
                        'order': announcement_data.get('order', 0),
                    }
                )
                
                imported_count += 1
                action = "Created" if created else "Updated"
                self.stdout.write(f'✅ {action}: {announcement.title}')
                
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f'❌ Failed to import announcement {announcement_data.get("title", "Unknown")}: {str(e)}')
                )
        
        self.stdout.write(f'📢 Imported {imported_count} announcements')
