from django.contrib import admin
from django.utils.html import format_html
from markdownx.admin import MarkdownxModelAdmin
from .models import (
    Category, Tag, BlogPost, Event, Gallery, Image, Newsletter,
    Contact, Submission, Internship, TeamMember, Leadership, Announcement, CarouselImage, NewsletterArchive
)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'created_at']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name']

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'created_at']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name']

@admin.register(BlogPost)
class BlogPostAdmin(MarkdownxModelAdmin):
    list_display = ['title', 'get_author_display', 'category', 'published', 'featured', 'published_date', 'created_at']
    list_filter = ['published', 'featured', 'category', 'published_date', 'created_at']
    search_fields = ['title', 'content', 'author_name']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ['tags']
    list_editable = ['published', 'featured']

    fieldsets = (
        ('Content', {
            'fields': ('title', 'slug', 'content', 'excerpt', 'category', 'tags', 'featured_image')
        }),
        ('Author Information', {
            'fields': ('author', 'author_name', 'author_bio', 'author_email'),
            'description': 'Use either Django user (author) OR external author fields (author_name, etc.)'
        }),
        ('Publishing', {
            'fields': ('published', 'featured', 'published_date')
        }),
    )

    def get_author_display(self, obj):
        return obj.get_author_name()
    get_author_display.short_description = 'Author'

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('author', 'category')

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'event_type', 'start_date', 'location', 'get_author_display', 'published', 'featured']
    list_filter = ['event_type', 'published', 'featured', 'start_date']
    search_fields = ['title', 'description', 'location', 'author_name']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['published', 'featured']
    date_hierarchy = 'start_date'

    fieldsets = (
        ('Event Details', {
            'fields': ('title', 'slug', 'description', 'content', 'event_type', 'featured_image')
        }),
        ('Schedule & Location', {
            'fields': ('start_date', 'end_date', 'location', 'registration_link')
        }),
        ('Organizer Information', {
            'fields': ('author', 'author_name'),
            'description': 'Use either Django user (author) OR external organizer name'
        }),
        ('Publishing', {
            'fields': ('published', 'featured')
        }),
    )

    def get_author_display(self, obj):
        return obj.get_author_name()
    get_author_display.short_description = 'Organizer'

class ImageInline(admin.TabularInline):
    model = Image
    extra = 1
    fields = ['title', 'image', 'alt_text', 'caption']

@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ['title', 'published', 'author', 'created_at', 'image_count']
    list_filter = ['published', 'created_at']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ImageInline]
    list_editable = ['published']

    def image_count(self, obj):
        return obj.images.count()
    image_count.short_description = 'Images'

@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['title', 'gallery', 'image_preview', 'created_at']
    list_filter = ['gallery', 'created_at']
    search_fields = ['title', 'alt_text', 'caption']

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover;" />', obj.image.url)
        return "No Image"
    image_preview.short_description = 'Preview'

@admin.register(Newsletter)
class NewsletterAdmin(admin.ModelAdmin):
    list_display = ['email', 'name', 'active', 'created_at']
    list_filter = ['active', 'created_at']
    search_fields = ['email', 'name']
    list_editable = ['active']

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'replied', 'created_at']
    list_filter = ['replied', 'created_at']
    search_fields = ['name', 'email', 'subject']
    list_editable = ['replied']
    readonly_fields = ['created_at']

    def has_add_permission(self, request):
        return False

@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ['title', 'author_name', 'submission_type', 'status', 'submitted_at']
    list_filter = ['submission_type', 'status', 'submitted_at']
    search_fields = ['title', 'author_name', 'author_email']
    list_editable = ['status']
    readonly_fields = ['submitted_at']

    fieldsets = (
        ('Submission Info', {
            'fields': ('submission_type', 'title', 'status')
        }),
        ('Author Info', {
            'fields': ('author_name', 'author_email', 'author_bio')
        }),
        ('Content', {
            'fields': ('content', 'keywords')
        }),
        ('Review', {
            'fields': ('review_notes', 'submitted_at', 'reviewed_at')
        }),
    )

    def has_add_permission(self, request):
        return False

@admin.register(Internship)
class InternshipAdmin(admin.ModelAdmin):
    list_display = ['applicant_name', 'university', 'course', 'status', 'applied_at']
    list_filter = ['status', 'course', 'applied_at']
    search_fields = ['applicant_name', 'applicant_email', 'university']
    list_editable = ['status']
    readonly_fields = ['applied_at']

    fieldsets = (
        ('Application Info', {
            'fields': ('status', 'applied_at', 'reviewed_at')
        }),
        ('Applicant Details', {
            'fields': ('applicant_name', 'applicant_email', 'phone')
        }),
        ('Academic Info', {
            'fields': ('university', 'course', 'year')
        }),
        ('Internship Details', {
            'fields': ('proposed_start_date', 'proposed_end_date', 'interest_letter')
        }),
        ('Documents', {
            'fields': ('cv', 'writing_sample')
        }),
        ('Review', {
            'fields': ('review_notes',)
        }),
    )

    def has_add_permission(self, request):
        return False

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'batch', 'active', 'order']
    list_filter = ['role', 'active', 'batch']
    search_fields = ['name', 'email']
    list_editable = ['active', 'order']
    ordering = ['order', 'name']

@admin.register(Leadership)
class LeadershipAdmin(admin.ModelAdmin):
    list_display = ['name', 'position', 'order']
    search_fields = ['name', 'position']
    list_editable = ['order']
    ordering = ['order', 'name']

@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ['title', 'announcement_type', 'is_featured', 'is_active', 'published_date', 'expiry_date', 'order']
    list_filter = ['announcement_type', 'is_featured', 'is_active', 'published_date']
    search_fields = ['title', 'content']
    list_editable = ['is_featured', 'is_active', 'order']
    ordering = ['-is_featured', '-published_date', 'order']

    fieldsets = (
        (None, {
            'fields': ('title', 'content', 'announcement_type')
        }),
        ('Display Options', {
            'fields': ('is_featured', 'is_active', 'order')
        }),
        ('Dates', {
            'fields': ('expiry_date',)
        }),
    )


@admin.register(CarouselImage)
class CarouselImageAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'order', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'description']
    list_editable = ['is_active', 'order']
    ordering = ['order', '-created_at']

    fieldsets = (
        (None, {
            'fields': ('title', 'description', 'image', 'link_url')
        }),
        ('Display Options', {
            'fields': ('is_active', 'order')
        }),
    )


@admin.register(NewsletterArchive)
class NewsletterArchiveAdmin(admin.ModelAdmin):
    list_display = ['title', 'issue_number', 'published_date', 'is_featured', 'order']
    list_filter = ['is_featured', 'published_date']
    search_fields = ['title', 'issue_number', 'description']
    list_editable = ['is_featured', 'order']
    ordering = ['-published_date', 'order']

    fieldsets = (
        (None, {
            'fields': ('title', 'description', 'issue_number', 'pdf_file', 'published_date')
        }),
        ('Display Options', {
            'fields': ('is_featured', 'order')
        }),
    )


# Customize admin site
admin.site.site_header = "GCADR Administration"
admin.site.site_title = "GCADR Admin"
admin.site.index_title = "Welcome to GCADR Administration"
