import os
import re
import yaml
from datetime import datetime
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from django.contrib.auth.models import User
from core.models import BlogPost, Category, Tag


class Command(BaseCommand):
    help = 'Import blog posts from markdown files'

    def add_arguments(self, parser):
        parser.add_argument(
            '--content-dir',
            type=str,
            default='../content/blogs',
            help='Directory containing markdown blog files'
        )

    def handle(self, *args, **options):
        content_dir = options['content_dir']
        
        if not os.path.exists(content_dir):
            self.stdout.write(
                self.style.ERROR(f'Content directory {content_dir} does not exist')
            )
            return
        
        self.stdout.write(f'Importing blogs from {content_dir}...')
        
        # Get default author
        default_author, _ = User.objects.get_or_create(
            username='admin',
            defaults={'email': 'admin@gcadr.gnlu.ac.in'}
        )
        
        imported_count = 0
        
        # Process all markdown files
        for filename in os.listdir(content_dir):
            if filename.endswith('.md'):
                filepath = os.path.join(content_dir, filename)
                try:
                    self.import_blog_post(filepath, default_author)
                    imported_count += 1
                    self.stdout.write(f'✅ Imported: {filename}')
                except Exception as e:
                    self.stdout.write(
                        self.style.ERROR(f'❌ Failed to import {filename}: {str(e)}')
                    )
        
        self.stdout.write(
            self.style.SUCCESS(f'🎉 Successfully imported {imported_count} blog posts!')
        )

    def import_blog_post(self, filepath, default_author):
        """Import a single markdown blog post"""
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Parse frontmatter and content
        frontmatter, markdown_content = self.parse_frontmatter(content)
        
        # Extract metadata
        title = frontmatter.get('title', os.path.basename(filepath).replace('.md', ''))
        slug = frontmatter.get('slug', slugify(title))
        published = frontmatter.get('published', True)
        featured = frontmatter.get('featured', False)
        excerpt = frontmatter.get('excerpt', self.generate_excerpt(markdown_content))
        
        # Handle date
        date_str = frontmatter.get('date')
        if date_str:
            if isinstance(date_str, str):
                published_date = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
            else:
                published_date = date_str
        else:
            published_date = datetime.now()
        
        # Handle author
        author_name = frontmatter.get('author')
        if author_name and author_name != 'admin':
            author = None
            author_name_field = author_name
        else:
            author = default_author
            author_name_field = ''
        
        # Create or update blog post
        blog_post, created = BlogPost.objects.update_or_create(
            slug=slug,
            defaults={
                'title': title,
                'content': markdown_content,
                'excerpt': excerpt,
                'published': published,
                'featured': featured,
                'author': author,
                'author_name': author_name_field,
                'published_date': published_date,
            }
        )
        
        # Handle category
        category_name = frontmatter.get('category')
        if category_name:
            category, _ = Category.objects.get_or_create(
                name=category_name,
                defaults={'slug': slugify(category_name)}
            )
            blog_post.category = category
        
        # Handle tags
        tags = frontmatter.get('tags', [])
        if tags:
            blog_post.tags.clear()
            for tag_name in tags:
                tag, _ = Tag.objects.get_or_create(
                    name=tag_name,
                    defaults={'slug': slugify(tag_name)}
                )
                blog_post.tags.add(tag)
        
        blog_post.save()
        
        return blog_post

    def parse_frontmatter(self, content):
        """Parse YAML frontmatter from markdown content"""
        if content.startswith('---'):
            try:
                # Split frontmatter and content
                parts = content.split('---', 2)
                if len(parts) >= 3:
                    frontmatter_str = parts[1].strip()
                    markdown_content = parts[2].strip()
                    frontmatter = yaml.safe_load(frontmatter_str) or {}
                    return frontmatter, markdown_content
            except yaml.YAMLError:
                pass
        
        # No frontmatter found
        return {}, content

    def generate_excerpt(self, content, max_length=200):
        """Generate excerpt from markdown content"""
        # Remove markdown formatting
        text = re.sub(r'[#*`_\[\]()]', '', content)
        # Remove extra whitespace
        text = ' '.join(text.split())
        # Truncate
        if len(text) > max_length:
            text = text[:max_length].rsplit(' ', 1)[0] + '...'
        return text
