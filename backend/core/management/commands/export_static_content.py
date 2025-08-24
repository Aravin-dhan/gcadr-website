import json
import os
import shutil
from django.core.management.base import BaseCommand
from django.core.serializers.json import DjangoJSONEncoder
from django.conf import settings
from core.models import (
    BlogPost, Event, TeamMember, Leadership, Announcement, 
    CarouselImage, Gallery, Image, NewsletterArchive
)
from core.serializers import (
    BlogPostListSerializer, EventListSerializer, TeamMemberSerializer,
    LeadershipSerializer, AnnouncementSerializer, CarouselImageSerializer
)


class Command(BaseCommand):
    help = 'Export all dynamic content to static JSON files for frontend'

    def add_arguments(self, parser):
        parser.add_argument(
            '--output-dir',
            type=str,
            default='../public/api',
            help='Output directory for static files (relative to backend)'
        )

    def handle(self, *args, **options):
        output_dir = options['output_dir']
        
        # Create output directory
        os.makedirs(output_dir, exist_ok=True)
        
        self.stdout.write(self.style.SUCCESS(f'Exporting content to {output_dir}...'))
        
        # Export all content types
        self.export_blog_posts(output_dir)
        self.export_events(output_dir)
        self.export_team_members(output_dir)
        self.export_leadership(output_dir)
        self.export_announcements(output_dir)
        self.export_carousel_images(output_dir)
        self.export_galleries(output_dir)
        self.export_newsletter_archives(output_dir)
        
        # Copy media files
        self.copy_media_files(output_dir)
        
        self.stdout.write(self.style.SUCCESS('✅ Static content export completed!'))

    def export_blog_posts(self, output_dir):
        """Export blog posts"""
        posts = BlogPost.objects.filter(published=True)
        
        # List view
        serializer = BlogPostListSerializer(posts, many=True)
        self.write_json_file(f'{output_dir}/blogs.json', {
            'results': serializer.data,
            'count': posts.count()
        })
        
        # Individual posts
        posts_dir = f'{output_dir}/blogs'
        os.makedirs(posts_dir, exist_ok=True)
        
        for post in posts:
            post_data = BlogPostListSerializer(post).data
            self.write_json_file(f'{posts_dir}/{post.slug}.json', post_data)
        
        self.stdout.write(f'📝 Exported {posts.count()} blog posts')

    def export_events(self, output_dir):
        """Export events"""
        events = Event.objects.filter(published=True)
        serializer = EventListSerializer(events, many=True)
        
        self.write_json_file(f'{output_dir}/events.json', {
            'results': serializer.data,
            'count': events.count()
        })
        
        self.stdout.write(f'📅 Exported {events.count()} events')

    def export_team_members(self, output_dir):
        """Export team members"""
        members = TeamMember.objects.filter(active=True)
        serializer = TeamMemberSerializer(members, many=True)
        
        self.write_json_file(f'{output_dir}/team.json', {
            'results': serializer.data,
            'count': members.count()
        })
        
        self.stdout.write(f'👥 Exported {members.count()} team members')

    def export_leadership(self, output_dir):
        """Export leadership"""
        leadership = Leadership.objects.all()
        serializer = LeadershipSerializer(leadership, many=True)
        
        self.write_json_file(f'{output_dir}/leadership.json', {
            'results': serializer.data,
            'count': leadership.count()
        })
        
        self.stdout.write(f'👔 Exported {leadership.count()} leadership members')

    def export_announcements(self, output_dir):
        """Export announcements"""
        announcements = Announcement.objects.filter(is_active=True)
        serializer = AnnouncementSerializer(announcements, many=True)
        
        self.write_json_file(f'{output_dir}/announcements.json', {
            'results': serializer.data,
            'count': announcements.count()
        })
        
        self.stdout.write(f'📢 Exported {announcements.count()} announcements')

    def export_carousel_images(self, output_dir):
        """Export carousel images"""
        images = CarouselImage.objects.filter(is_active=True)
        serializer = CarouselImageSerializer(images, many=True)
        
        self.write_json_file(f'{output_dir}/carousel.json', {
            'results': serializer.data,
            'count': images.count()
        })
        
        self.stdout.write(f'🖼️ Exported {images.count()} carousel images')

    def export_galleries(self, output_dir):
        """Export galleries"""
        galleries = Gallery.objects.filter(published=True)
        gallery_data = []
        
        for gallery in galleries:
            images = Image.objects.filter(gallery=gallery)
            gallery_info = {
                'id': gallery.id,
                'title': gallery.title,
                'slug': gallery.slug,
                'description': gallery.description,
                'cover_image': gallery.cover_image.url if gallery.cover_image else None,
                'images': [
                    {
                        'id': img.id,
                        'title': img.title,
                        'image': img.image.url if img.image else None,
                        'alt_text': img.alt_text,
                        'caption': img.caption
                    } for img in images
                ]
            }
            gallery_data.append(gallery_info)
        
        self.write_json_file(f'{output_dir}/galleries.json', {
            'results': gallery_data,
            'count': len(gallery_data)
        })
        
        self.stdout.write(f'🖼️ Exported {len(gallery_data)} galleries')

    def export_newsletter_archives(self, output_dir):
        """Export newsletter archives"""
        newsletters = NewsletterArchive.objects.all()
        newsletter_data = []
        
        for newsletter in newsletters:
            newsletter_info = {
                'id': newsletter.id,
                'title': newsletter.title,
                'description': newsletter.description,
                'issue_number': newsletter.issue_number,
                'published_date': newsletter.published_date.isoformat(),
                'pdf_file': newsletter.pdf_file.url if newsletter.pdf_file else None,
                'is_featured': newsletter.is_featured
            }
            newsletter_data.append(newsletter_info)
        
        self.write_json_file(f'{output_dir}/newsletters.json', {
            'results': newsletter_data,
            'count': len(newsletter_data)
        })
        
        self.stdout.write(f'📰 Exported {len(newsletter_data)} newsletters')

    def copy_media_files(self, output_dir):
        """Copy media files to public directory"""
        media_source = os.path.join(settings.BASE_DIR, 'media')
        media_dest = f'{output_dir}/../media'
        
        if os.path.exists(media_source):
            if os.path.exists(media_dest):
                shutil.rmtree(media_dest)
            shutil.copytree(media_source, media_dest)
            self.stdout.write(f'📁 Copied media files to {media_dest}')

    def write_json_file(self, filepath, data):
        """Write data to JSON file"""
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, cls=DjangoJSONEncoder, indent=2, ensure_ascii=False)
