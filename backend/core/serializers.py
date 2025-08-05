from rest_framework import serializers
from .models import (
    Category, Tag, BlogPost, Event, Gallery, Image, Newsletter,
    Contact, Submission, Internship, TeamMember, Leadership, Announcement, CarouselImage, NewsletterArchive
)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'created_at']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug', 'created_at']

class BlogPostListSerializer(serializers.ModelSerializer):
    author_display_name = serializers.CharField(source='get_author_name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    featured_image_url = serializers.CharField(source='get_featured_image_url', read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'published', 'featured',
            'author_display_name', 'category_name', 'tags', 'featured_image', 'featured_image_url', 'created_at'
        ]

class BlogPostDetailSerializer(serializers.ModelSerializer):
    author_display_name = serializers.CharField(source='get_author_name', read_only=True)
    author_email = serializers.CharField(source='get_author_email', read_only=True)
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'content', 'excerpt', 'published', 'featured',
            'author_display_name', 'author_bio', 'author_email', 'category', 'tags',
            'featured_image', 'created_at', 'updated_at'
        ]

class EventListSerializer(serializers.ModelSerializer):
    author_display_name = serializers.CharField(source='get_author_name', read_only=True)

    class Meta:
        model = Event
        fields = [
            'id', 'title', 'slug', 'description', 'start_date', 'end_date',
            'location', 'event_type', 'published', 'featured', 'author_display_name',
            'featured_image', 'registration_link', 'created_at'
        ]

class EventDetailSerializer(serializers.ModelSerializer):
    author_display_name = serializers.CharField(source='get_author_name', read_only=True)

    class Meta:
        model = Event
        fields = [
            'id', 'title', 'slug', 'description', 'content', 'start_date', 'end_date',
            'location', 'event_type', 'published', 'featured', 'author_display_name',
            'featured_image', 'registration_link', 'created_at', 'updated_at'
        ]

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'title', 'image', 'alt_text', 'caption', 'created_at']

class GalleryListSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)
    image_count = serializers.IntegerField(source='images.count', read_only=True)
    
    class Meta:
        model = Gallery
        fields = [
            'id', 'title', 'slug', 'description', 'published', 'author_name',
            'cover_image', 'image_count', 'created_at'
        ]

class GalleryDetailSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)
    images = ImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Gallery
        fields = [
            'id', 'title', 'slug', 'description', 'published', 'author_name',
            'cover_image', 'images', 'created_at', 'updated_at'
        ]

class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newsletter
        fields = ['id', 'email', 'name', 'active', 'created_at']
        read_only_fields = ['id', 'created_at']

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'subject', 'message', 'attachment', 'created_at']
        read_only_fields = ['id', 'created_at']


class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = ['id', 'title', 'content', 'announcement_type', 'is_featured', 'published_date', 'expiry_date']
        read_only_fields = ['id', 'published_date']


class CarouselImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarouselImage
        fields = ['id', 'title', 'description', 'image', 'link_url', 'is_active', 'order', 'created_at']
        read_only_fields = ['id', 'created_at']


class NewsletterArchiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterArchive
        fields = ['id', 'title', 'description', 'issue_number', 'pdf_file', 'published_date', 'is_featured', 'order']
        read_only_fields = ['id']

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = [
            'id', 'submission_type', 'title', 'author_name', 'author_email',
            'author_bio', 'content', 'keywords', 'submitted_at'
        ]
        read_only_fields = ['id', 'submitted_at']

class InternshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Internship
        fields = [
            'id', 'applicant_name', 'applicant_email', 'phone', 'university',
            'course', 'year', 'proposed_start_date', 'proposed_end_date',
            'interest_letter', 'cv', 'writing_sample', 'applied_at'
        ]
        read_only_fields = ['id', 'applied_at']

class TeamMemberSerializer(serializers.ModelSerializer):
    role_display = serializers.CharField(source='get_role_display', read_only=True)
    image_url = serializers.CharField(source='get_image_url', read_only=True)

    class Meta:
        model = TeamMember
        fields = [
            'id', 'name', 'role', 'role_display', 'batch', 'email', 'linkedin_url',
            'bio', 'image', 'image_url', 'active', 'order'
        ]

class LeadershipSerializer(serializers.ModelSerializer):
    image_url = serializers.CharField(source='get_image_url', read_only=True)

    class Meta:
        model = Leadership
        fields = [
            'id', 'name', 'position', 'bio', 'email', 'image', 'image_url', 'order'
        ]

class CarouselImageSerializer(serializers.ModelSerializer):
    image_url = serializers.CharField(source='get_image_url', read_only=True)
    title_color_display = serializers.CharField(source='get_title_color_display', read_only=True)

    class Meta:
        model = CarouselImage
        fields = [
            'id', 'title', 'description', 'image', 'image_url', 'link_url',
            'title_color', 'title_color_display', 'show_title', 'is_active', 'order'
        ]

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = [
            'id', 'title', 'content', 'announcement_type', 'is_featured', 'published_date', 'created_at'
        ]
