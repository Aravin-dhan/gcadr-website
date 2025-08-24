from django.shortcuts import render, redirect
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os
import yaml
from datetime import datetime
from django.conf import settings


@staff_member_required
def content_dashboard(request):
    """Main content management dashboard"""
    return render(request, 'content_manager/dashboard.html')


@staff_member_required
def team_manager(request):
    """Team member management interface"""
    team_file = os.path.join(settings.BASE_DIR, '../content/team/team-members.yaml')
    
    if request.method == 'POST':
        try:
            # Save team data
            team_data = json.loads(request.body)
            
            # Ensure directory exists
            os.makedirs(os.path.dirname(team_file), exist_ok=True)
            
            # Write YAML file
            with open(team_file, 'w', encoding='utf-8') as f:
                yaml.dump(team_data, f, default_flow_style=False, allow_unicode=True)
            
            return JsonResponse({'success': True, 'message': 'Team data saved successfully'})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    
    # Load existing team data
    team_data = {'team_members': []}
    if os.path.exists(team_file):
        try:
            with open(team_file, 'r', encoding='utf-8') as f:
                team_data = yaml.safe_load(f) or {'team_members': []}
        except Exception as e:
            messages.error(request, f'Error loading team data: {str(e)}')
    
    return render(request, 'content_manager/team_manager.html', {'team_data': team_data})


@staff_member_required
def carousel_manager(request):
    """Carousel management interface"""
    carousel_file = os.path.join(settings.BASE_DIR, '../content/config/carousel.yaml')
    
    if request.method == 'POST':
        try:
            # Save carousel data
            carousel_data = json.loads(request.body)
            
            # Ensure directory exists
            os.makedirs(os.path.dirname(carousel_file), exist_ok=True)
            
            # Write YAML file
            with open(carousel_file, 'w', encoding='utf-8') as f:
                yaml.dump(carousel_data, f, default_flow_style=False, allow_unicode=True)
            
            return JsonResponse({'success': True, 'message': 'Carousel data saved successfully'})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    
    # Load existing carousel data
    carousel_data = {'carousel_images': []}
    if os.path.exists(carousel_file):
        try:
            with open(carousel_file, 'r', encoding='utf-8') as f:
                carousel_data = yaml.safe_load(f) or {'carousel_images': []}
        except Exception as e:
            messages.error(request, f'Error loading carousel data: {str(e)}')
    
    return render(request, 'content_manager/carousel_manager.html', {'carousel_data': carousel_data})


@staff_member_required
def blog_manager(request):
    """Blog post management interface"""
    blogs_dir = os.path.join(settings.BASE_DIR, '../content/blogs')
    
    if request.method == 'POST':
        try:
            # Save blog post
            blog_data = json.loads(request.body)
            
            # Ensure directory exists
            os.makedirs(blogs_dir, exist_ok=True)
            
            # Generate filename
            date_str = blog_data.get('date', datetime.now().strftime('%Y-%m-%d'))
            slug = blog_data.get('slug', blog_data.get('title', 'untitled').lower().replace(' ', '-'))
            filename = f"{date_str}-{slug}.md"
            filepath = os.path.join(blogs_dir, filename)
            
            # Create markdown content
            frontmatter = {
                'title': blog_data.get('title', ''),
                'date': blog_data.get('date', ''),
                'author': blog_data.get('author', ''),
                'category': blog_data.get('category', ''),
                'tags': blog_data.get('tags', []),
                'featured': blog_data.get('featured', False),
                'published': blog_data.get('published', True),
                'excerpt': blog_data.get('excerpt', ''),
                'featured_image': blog_data.get('featured_image', '')
            }
            
            content = f"---\n{yaml.dump(frontmatter, default_flow_style=False)}---\n\n{blog_data.get('content', '')}"
            
            # Write markdown file
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            
            return JsonResponse({'success': True, 'message': f'Blog post saved as {filename}'})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    
    # Load existing blog posts
    blog_posts = []
    if os.path.exists(blogs_dir):
        for filename in os.listdir(blogs_dir):
            if filename.endswith('.md'):
                blog_posts.append(filename)
    
    return render(request, 'content_manager/blog_manager.html', {'blog_posts': blog_posts})


@staff_member_required
@csrf_exempt
def build_static_content(request):
    """Trigger static content build"""
    if request.method == 'POST':
        try:
            # Import management commands
            from django.core.management import call_command
            
            # Run import commands
            call_command('import_markdown_blogs')
            call_command('import_team_data')
            call_command('import_config_data')
            
            # Export static content
            call_command('export_static_content')
            
            return JsonResponse({'success': True, 'message': 'Static content built successfully'})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    
    return JsonResponse({'success': False, 'error': 'POST method required'})
