from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.core.validators import EmailValidator
from markdownx.models import MarkdownxField
import uuid

class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Category(BaseModel):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Tag(BaseModel):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name

class BlogPost(BaseModel):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    content = MarkdownxField(help_text="Content in Markdown format")
    excerpt = models.TextField(blank=True)
    published = models.BooleanField(default=False)
    featured = models.BooleanField(default=False)

    # Flexible author system
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='blog_posts')
    author_name = models.CharField(max_length=200, blank=True, help_text="Use this for external or guest authors")
    author_bio = models.TextField(blank=True, help_text="Brief bio for external authors")
    author_email = models.EmailField(blank=True, help_text="Contact email for external authors")

    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)
    featured_image = models.ImageField(upload_to='blog_images/', blank=True, null=True)

    # Date fields - editable in admin
    published_date = models.DateTimeField(default=timezone.now, help_text="Date when the post was/will be published")

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def get_author_name(self):
        """Return the appropriate author name"""
        if self.author:
            return self.author.get_full_name() or self.author.username
        return self.author_name or "Anonymous"

    def get_author_email(self):
        """Return the appropriate author email"""
        if self.author:
            return self.author.email
        return self.author_email

class Event(BaseModel):
    EVENT_TYPES = [
        ('conference', 'Conference'),
        ('workshop', 'Workshop'),
        ('seminar', 'Seminar'),
        ('competition', 'Competition'),
        ('course', 'Course'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    content = models.TextField(blank=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField(blank=True, null=True)
    location = models.CharField(max_length=200, blank=True)
    event_type = models.CharField(max_length=20, choices=EVENT_TYPES)
    published = models.BooleanField(default=False)
    featured = models.BooleanField(default=False)

    # Flexible author system
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='events')
    author_name = models.CharField(max_length=200, blank=True, help_text="Use this for external organizers")

    featured_image = models.ImageField(upload_to='event_images/', blank=True, null=True)
    registration_link = models.URLField(blank=True)

    def get_author_name(self):
        """Return the appropriate author name"""
        if self.author:
            return self.author.get_full_name() or self.author.username
        return self.author_name or "GCADR"

    class Meta:
        ordering = ['start_date']

    def __str__(self):
        return self.title

class Gallery(BaseModel):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    published = models.BooleanField(default=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='galleries')
    cover_image = models.ImageField(upload_to='gallery_covers/', blank=True, null=True)

    class Meta:
        verbose_name_plural = "Galleries"
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class Image(BaseModel):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='gallery_images/')
    alt_text = models.CharField(max_length=200, blank=True)
    caption = models.TextField(blank=True)
    gallery = models.ForeignKey(Gallery, on_delete=models.CASCADE, related_name='images', null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class Newsletter(BaseModel):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100, blank=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.email

class Contact(BaseModel):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    attachment = models.FileField(upload_to='contact_attachments/', blank=True, null=True)
    replied = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.subject}"

class Submission(BaseModel):
    SUBMISSION_TYPES = [
        ('blog_article', 'Blog Article'),
        ('journal_article', 'Journal Article'),
    ]

    SUBMISSION_STATUS = [
        ('pending', 'Pending'),
        ('under_review', 'Under Review'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
        ('published', 'Published'),
    ]

    submission_type = models.CharField(max_length=20, choices=SUBMISSION_TYPES)
    title = models.CharField(max_length=200)
    author_name = models.CharField(max_length=100)
    author_email = models.EmailField()
    author_bio = models.TextField(blank=True)
    content = models.TextField()
    keywords = models.CharField(max_length=500, blank=True)
    status = models.CharField(max_length=20, choices=SUBMISSION_STATUS, default='pending')
    review_notes = models.TextField(blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.title} by {self.author_name}"

class Internship(BaseModel):
    INTERNSHIP_STATUS = [
        ('pending', 'Pending'),
        ('under_review', 'Under Review'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]

    applicant_name = models.CharField(max_length=100)
    applicant_email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    university = models.CharField(max_length=200)
    course = models.CharField(max_length=100)
    year = models.CharField(max_length=20)
    proposed_start_date = models.DateField()
    proposed_end_date = models.DateField()
    interest_letter = models.TextField()
    cv = models.FileField(upload_to='internship_cvs/')
    writing_sample = models.FileField(upload_to='internship_writing_samples/')
    status = models.CharField(max_length=20, choices=INTERNSHIP_STATUS, default='pending')
    review_notes = models.TextField(blank=True)
    applied_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        ordering = ['-applied_at']

    def __str__(self):
        return f"{self.applicant_name} - {self.university}"

class TeamMember(BaseModel):
    ROLES = [
        ('convenor', 'Convenor'),
        ('co_convenor', 'Co-convenor'),
        ('secretary', 'Secretary'),
        ('co_secretary', 'Co-secretary'),
        ('treasurer', 'Treasurer'),
        ('co_treasurer', 'Co-Treasurer'),
        ('social_media_head', 'Social Media Head'),
        ('it_blog_head', 'IT and Blog Head'),
        ('research_outreach_head', 'Research and Outreach Head'),
        ('student_mentor', 'Student Mentor'),
        ('mediation_cell_head', 'Mediation Cell Head'),
        ('student_member', 'Student Member'),
    ]

    name = models.CharField(max_length=100)
    role = models.CharField(max_length=30, choices=ROLES)
    batch = models.CharField(max_length=20)
    email = models.EmailField(blank=True)
    linkedin_url = models.URLField(blank=True, help_text="LinkedIn profile URL")
    bio = models.TextField(blank=True)
    image = models.ImageField(upload_to='team_images/', blank=True, null=True)
    active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return f"{self.name} - {self.get_role_display()}"

class Leadership(BaseModel):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    bio = models.TextField()
    email = models.EmailField(blank=True)
    image = models.ImageField(upload_to='leadership_images/', blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return f"{self.name} - {self.position}"


class Announcement(BaseModel):
    title = models.CharField(max_length=200)
    content = models.TextField()
    announcement_type = models.CharField(
        max_length=20,
        choices=[
            ('news', 'News'),
            ('event', 'Event'),
            ('deadline', 'Deadline'),
            ('general', 'General'),
        ],
        default='general'
    )
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    published_date = models.DateTimeField(auto_now_add=True)
    expiry_date = models.DateTimeField(blank=True, null=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['-is_featured', '-published_date', 'order']

    def __str__(self):
        return self.title


class CarouselImage(BaseModel):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='carousel_images/')
    link_url = models.URLField(blank=True, help_text="Optional link when image is clicked")
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title


class NewsletterArchive(BaseModel):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    issue_number = models.CharField(max_length=50, help_text="e.g., 'Issue 1, 2024'")
    pdf_file = models.FileField(upload_to='newsletter_archives/')
    published_date = models.DateField()
    is_featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-published_date', 'order']

    def __str__(self):
        return f"{self.title} - {self.issue_number}"
