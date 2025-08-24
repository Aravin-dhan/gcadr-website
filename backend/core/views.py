from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from django.db import models
from .models import (
    Category, Tag, BlogPost, Event, Gallery, Image, Newsletter,
    Contact, Submission, Internship, TeamMember, Leadership, Announcement, CarouselImage, NewsletterArchive
)
from .serializers import (
    CategorySerializer, TagSerializer, BlogPostListSerializer, BlogPostDetailSerializer,
    EventListSerializer, EventDetailSerializer, GalleryListSerializer, GalleryDetailSerializer,
    ImageSerializer, NewsletterSerializer, ContactSerializer, SubmissionSerializer,
    InternshipSerializer, TeamMemberSerializer, LeadershipSerializer, AnnouncementSerializer, CarouselImageSerializer, NewsletterArchiveSerializer
)

# Blog Views
class BlogPostListView(generics.ListAPIView):
    serializer_class = BlogPostListSerializer

    def get_queryset(self):
        queryset = BlogPost.objects.filter(published=True).select_related('author', 'category').prefetch_related('tags')
        featured = self.request.query_params.get('featured', None)
        category = self.request.query_params.get('category', None)

        if featured is not None:
            queryset = queryset.filter(featured=True)
        if category is not None:
            queryset = queryset.filter(category__slug=category)

        return queryset

class BlogPostDetailView(generics.RetrieveAPIView):
    serializer_class = BlogPostDetailSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return BlogPost.objects.filter(published=True).select_related('author', 'category').prefetch_related('tags')

# Event Views
class EventListView(generics.ListAPIView):
    serializer_class = EventListSerializer

    def get_queryset(self):
        queryset = Event.objects.filter(published=True).select_related('author')
        featured = self.request.query_params.get('featured', None)
        event_type = self.request.query_params.get('type', None)
        upcoming = self.request.query_params.get('upcoming', None)

        if featured is not None:
            queryset = queryset.filter(featured=True)
        if event_type is not None:
            queryset = queryset.filter(event_type=event_type)
        if upcoming is not None:
            from django.utils import timezone
            queryset = queryset.filter(start_date__gte=timezone.now())

        return queryset

class EventDetailView(generics.RetrieveAPIView):
    serializer_class = EventDetailSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return Event.objects.filter(published=True).select_related('author')

# Gallery Views
class GalleryListView(generics.ListAPIView):
    serializer_class = GalleryListSerializer

    def get_queryset(self):
        return Gallery.objects.filter(published=True).select_related('author').annotate(
            image_count=models.Count('images')
        )

class GalleryDetailView(generics.RetrieveAPIView):
    serializer_class = GalleryDetailSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return Gallery.objects.filter(published=True).select_related('author').prefetch_related('images')

# Team and Leadership Views
class TeamMemberListView(generics.ListAPIView):
    serializer_class = TeamMemberSerializer
    queryset = TeamMember.objects.filter(active=True)

class LeadershipListView(generics.ListAPIView):
    serializer_class = LeadershipSerializer
    queryset = Leadership.objects.all()

# Category and Tag Views
class CategoryListView(generics.ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class TagListView(generics.ListAPIView):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()

# Form Submission Views
@api_view(['POST'])
def newsletter_signup(request):
    serializer = NewsletterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Successfully subscribed to newsletter'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def contact_submit(request):
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Contact form submitted successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def submission_submit(request):
    serializer = SubmissionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Submission submitted successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def internship_apply(request):
    serializer = InternshipSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Internship application submitted successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Featured Content View
@api_view(['GET'])
def featured_content(request):
    featured_blogs = BlogPost.objects.filter(published=True, featured=True)[:3]
    featured_events = Event.objects.filter(published=True, featured=True)[:3]

    blog_serializer = BlogPostListSerializer(featured_blogs, many=True)
    event_serializer = EventListSerializer(featured_events, many=True)

    return Response({
        'featured_blogs': blog_serializer.data,
        'featured_events': event_serializer.data
    })

# Search View
@api_view(['GET'])
def search(request):
    query = request.query_params.get('q', '')
    if not query:
        return Response({'results': []})

    # Search in blog posts
    blog_results = BlogPost.objects.filter(
        published=True,
        title__icontains=query
    ).select_related('author', 'category')[:5]

    # Search in events
    event_results = Event.objects.filter(
        published=True,
        title__icontains=query
    ).select_related('author')[:5]

    blog_serializer = BlogPostListSerializer(blog_results, many=True)
    event_serializer = EventListSerializer(event_results, many=True)

    return Response({
        'blogs': blog_serializer.data,
        'events': event_serializer.data
    })


# Announcement Views
class AnnouncementListView(generics.ListAPIView):
    serializer_class = AnnouncementSerializer

    def get_queryset(self):
        queryset = Announcement.objects.filter(is_active=True)

        # Filter by type if specified
        announcement_type = self.request.query_params.get('type', None)
        if announcement_type:
            queryset = queryset.filter(announcement_type=announcement_type)

        # Filter featured announcements
        featured = self.request.query_params.get('featured', None)
        if featured and featured.lower() == 'true':
            queryset = queryset.filter(is_featured=True)

        # Limit results if specified
        limit = self.request.query_params.get('limit', None)
        if limit:
            try:
                limit = int(limit)
                queryset = queryset[:limit]
            except ValueError:
                pass

        return queryset


# Carousel Views
class CarouselImageListView(generics.ListAPIView):
    serializer_class = CarouselImageSerializer
    queryset = CarouselImage.objects.filter(is_active=True)


# Newsletter Archive Views
class NewsletterArchiveListView(generics.ListAPIView):
    serializer_class = NewsletterArchiveSerializer
    queryset = NewsletterArchive.objects.all()
