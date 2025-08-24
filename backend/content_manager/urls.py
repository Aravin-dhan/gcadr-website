from django.urls import path
from . import views

app_name = 'content_manager'

urlpatterns = [
    path('', views.content_dashboard, name='dashboard'),
    path('team/', views.team_manager, name='team_manager'),
    path('carousel/', views.carousel_manager, name='carousel_manager'),
    path('blog/', views.blog_manager, name='blog_manager'),
    path('build/', views.build_static_content, name='build_static_content'),
]
