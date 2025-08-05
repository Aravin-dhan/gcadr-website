from django.urls import path
from . import views

urlpatterns = [
    # Blog URLs
    path('api/blogs/', views.BlogPostListView.as_view(), name='blog-list'),
    path('api/blogs/<slug:slug>/', views.BlogPostDetailView.as_view(), name='blog-detail'),
    
    # Event URLs
    path('api/events/', views.EventListView.as_view(), name='event-list'),
    path('api/events/<slug:slug>/', views.EventDetailView.as_view(), name='event-detail'),
    
    # Gallery URLs
    path('api/galleries/', views.GalleryListView.as_view(), name='gallery-list'),
    path('api/galleries/<slug:slug>/', views.GalleryDetailView.as_view(), name='gallery-detail'),
    
    # Team and Leadership URLs
    path('api/team/', views.TeamMemberListView.as_view(), name='team-list'),
    path('api/leadership/', views.LeadershipListView.as_view(), name='leadership-list'),

    # Announcement URLs
    path('api/announcements/', views.AnnouncementListView.as_view(), name='announcement-list'),

    # Carousel URLs
    path('api/carousel/', views.CarouselImageListView.as_view(), name='carousel-list'),

    # Newsletter Archive URLs
    path('api/newsletter-archives/', views.NewsletterArchiveListView.as_view(), name='newsletter-archive-list'),
    
    # Category and Tag URLs
    path('api/categories/', views.CategoryListView.as_view(), name='category-list'),
    path('api/tags/', views.TagListView.as_view(), name='tag-list'),
    
    # Form Submission URLs
    path('api/newsletter/signup/', views.newsletter_signup, name='newsletter-signup'),
    path('api/contact/submit/', views.contact_submit, name='contact-submit'),
    path('api/submissions/submit/', views.submission_submit, name='submission-submit'),
    path('api/internship/apply/', views.internship_apply, name='internship-apply'),
    
    # Utility URLs
    path('api/featured/', views.featured_content, name='featured-content'),
    path('api/search/', views.search, name='search'),
]
