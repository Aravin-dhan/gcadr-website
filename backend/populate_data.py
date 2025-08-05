#!/usr/bin/env python
import os
import sys
import django
from datetime import datetime, timedelta
from django.utils import timezone

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gcadr_backend.settings')
django.setup()

from django.contrib.auth.models import User
from core.models import (
    Category, Tag, BlogPost, Event, Gallery, Image, 
    TeamMember, Leadership, Newsletter, Contact, Submission, Internship
)

def create_sample_data():
    print("Creating sample data...")
    
    # Create superuser if it doesn't exist
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@gcadr.com', 'admin123')
        print("Created admin user")
    
    admin_user = User.objects.get(username='admin')
    
    # Create Categories
    categories = [
        {'name': 'Analysis', 'slug': 'analysis', 'description': 'In-depth analysis of ADR topics'},
        {'name': 'Education', 'slug': 'education', 'description': 'Educational content about ADR'},
        {'name': 'International', 'slug': 'international', 'description': 'International ADR developments'},
        {'name': 'Case Studies', 'slug': 'case-studies', 'description': 'Real-world ADR case studies'},
    ]
    
    for cat_data in categories:
        category, created = Category.objects.get_or_create(
            slug=cat_data['slug'],
            defaults=cat_data
        )
        if created:
            print(f"Created category: {category.name}")
    
    # Create Tags
    tags_data = [
        {'name': 'ADR', 'slug': 'adr'},
        {'name': 'Arbitration', 'slug': 'arbitration'},
        {'name': 'Mediation', 'slug': 'mediation'},
        {'name': 'India', 'slug': 'india'},
        {'name': 'International', 'slug': 'international'},
        {'name': 'Commercial', 'slug': 'commercial'},
        {'name': 'Legal Framework', 'slug': 'legal-framework'},
    ]
    
    for tag_data in tags_data:
        tag, created = Tag.objects.get_or_create(
            slug=tag_data['slug'],
            defaults=tag_data
        )
        if created:
            print(f"Created tag: {tag.name}")
    
    # Create Blog Posts
    blog_posts = [
        {
            'title': 'The Future of Alternative Dispute Resolution in India',
            'slug': 'future-adr-india',
            'content': '''Alternative Dispute Resolution (ADR) has emerged as a crucial component of the Indian legal system, offering efficient and cost-effective solutions to disputes. As we look towards the future, several trends are shaping the landscape of ADR in India.

The growing acceptance of ADR mechanisms by both the judiciary and the legal fraternity has been remarkable. Courts are increasingly referring cases to mediation and arbitration, recognizing the benefits of these processes in reducing case backlogs and providing timely justice.

Technology integration is another significant trend. Online dispute resolution (ODR) platforms are gaining traction, especially in the post-pandemic era. These platforms offer accessibility and convenience, making ADR services available to a broader population.

The regulatory framework continues to evolve, with amendments to the Arbitration and Conciliation Act, 2015, aimed at making arbitration more efficient and enforceable. The establishment of specialized arbitration institutions and the promotion of institutional arbitration are positive developments.

Looking ahead, we can expect greater specialization in ADR, with sector-specific mechanisms for areas like construction, technology, and international trade. The integration of artificial intelligence and machine learning in dispute resolution processes is also on the horizon.

GCADR remains committed to advancing these developments through research, education, and practical training, ensuring that the next generation of legal professionals is well-equipped to navigate this evolving landscape.''',
            'excerpt': 'Exploring the evolving landscape of ADR mechanisms and their growing importance in the Indian legal system.',
            'published': True,
            'featured': True,
            'category': 'analysis',
            'tags': ['adr', 'india', 'legal-framework']
        },
        {
            'title': 'Mediation vs Arbitration: Understanding the Differences',
            'slug': 'mediation-vs-arbitration',
            'content': '''While both mediation and arbitration are forms of Alternative Dispute Resolution, they differ significantly in their approach, process, and outcomes. Understanding these differences is crucial for choosing the right ADR method for your dispute.

**Mediation: The Collaborative Approach**

Mediation is a facilitative process where a neutral third party, the mediator, helps disputing parties reach a mutually acceptable solution. The mediator does not impose a decision but guides the parties through structured negotiations.

Key characteristics of mediation:
- Voluntary participation
- Confidential process
- Parties retain control over the outcome
- Non-binding unless parties agree
- Preserves relationships
- Cost-effective and time-efficient

**Arbitration: The Adjudicative Process**

Arbitration, on the other hand, is more formal and resembles court proceedings. An arbitrator or panel of arbitrators hears evidence and arguments from both sides and renders a binding decision called an award.

Key characteristics of arbitration:
- Can be voluntary or mandatory
- More formal procedure
- Arbitrator makes the final decision
- Generally binding and enforceable
- Limited grounds for appeal
- Faster than litigation but more formal than mediation

**Choosing the Right Method**

The choice between mediation and arbitration depends on various factors:
- Nature of the dispute
- Relationship between parties
- Desired level of control over outcome
- Time and cost considerations
- Need for precedent or finality

At GCADR, we train students and practitioners in both methods, emphasizing the importance of understanding when and how to use each effectively.''',
            'excerpt': 'A comprehensive comparison of mediation and arbitration processes, helping you choose the right ADR method.',
            'published': True,
            'featured': True,
            'category': 'education',
            'tags': ['mediation', 'arbitration', 'adr']
        },
        {
            'title': 'Recent Developments in International Commercial Arbitration',
            'slug': 'international-commercial-arbitration',
            'content': '''International commercial arbitration continues to evolve rapidly, with significant developments in rules, procedures, and enforcement mechanisms. This article examines the key trends shaping the field.

**Institutional Reforms and New Rules**

Major arbitration institutions have updated their rules to address contemporary challenges. The ICC, LCIA, and SIAC have introduced provisions for expedited procedures, emergency arbitration, and enhanced case management techniques.

**Technology Integration**

The COVID-19 pandemic accelerated the adoption of technology in arbitration. Virtual hearings, electronic document management, and AI-assisted case analysis are becoming standard practices.

**Diversity and Inclusion**

There's a growing focus on diversity in arbitrator appointments and arbitration teams. Institutions are implementing policies to promote gender and geographical diversity.

**Third-Party Funding**

The regulation and disclosure of third-party funding in arbitration has become a significant issue, with different jurisdictions taking varying approaches.

**Enforcement Challenges**

While the New York Convention provides a robust framework for enforcement, challenges remain in certain jurisdictions. Recent court decisions have clarified various aspects of enforcement.

**Environmental and ESG Considerations**

Arbitration institutions are increasingly incorporating environmental and ESG considerations into their procedures and decision-making processes.

These developments reflect the dynamic nature of international arbitration and its adaptation to changing global business needs. GCADR's research initiatives closely monitor these trends to ensure our curriculum remains current and relevant.''',
            'excerpt': 'An overview of recent trends and developments in international commercial arbitration practices.',
            'published': True,
            'featured': False,
            'category': 'international',
            'tags': ['international', 'commercial', 'arbitration']
        }
    ]
    
    for post_data in blog_posts:
        category = Category.objects.get(slug=post_data['category'])
        tag_slugs = post_data.pop('tags')
        
        blog_post, created = BlogPost.objects.get_or_create(
            slug=post_data['slug'],
            defaults={
                **post_data,
                'author': admin_user,
                'category': category
            }
        )
        
        if created:
            # Add tags
            for tag_slug in tag_slugs:
                tag = Tag.objects.get(slug=tag_slug)
                blog_post.tags.add(tag)
            print(f"Created blog post: {blog_post.title}")
    
    # Create Leadership
    leadership_data = [
        {
            'name': 'Prof. (Dr.) Vikas Gandhi',
            'position': 'Faculty Convenor, GCADR',
            'bio': 'Prof. (Dr.) Vikas Gandhi is the Faculty Convenor of the GNLU Centre for Alternative Dispute Resolution. Under his distinguished leadership, GCADR has emerged as a premier education hub for ADR training, providing specialized training and promoting a culture of dispute resolution through conferences, workshops, and competitions. He has successfully created and sustainably developed a vibrant culture of ADR within the University and beyond.',
            'email': 'vikas.gandhi@gnlu.ac.in',
            'order': 1
        }
    ]
    
    for leader_data in leadership_data:
        leadership, created = Leadership.objects.get_or_create(
            name=leader_data['name'],
            defaults=leader_data
        )
        if created:
            print(f"Created leadership: {leadership.name}")
    
    # Create Team Members
    team_members = [
        {'name': 'Garvita Bhatt', 'role': 'convenor', 'batch': '2020 – 2025', 'order': 1},
        {'name': 'Tahir Syed', 'role': 'co_convenor', 'batch': '2021 – 2026', 'order': 2},
        {'name': 'Shreya Kumar', 'role': 'secretary', 'batch': '2020 - 2025', 'order': 3},
        {'name': 'Anshuman Jhala', 'role': 'co_secretary', 'batch': '2021 - 2026', 'order': 4},
        {'name': 'Yuman Islam', 'role': 'treasurer', 'batch': '2020 – 2025', 'order': 5},
        {'name': 'Kanhai Parikh', 'role': 'co_treasurer', 'batch': '2021 – 2026', 'order': 6},
        {'name': 'Jyotirmoy Alayman', 'role': 'social_media_head', 'batch': '2022 – 2027', 'order': 7},
        {'name': 'Chaitya Doshi', 'role': 'it_blog_head', 'batch': '2020 – 2025', 'order': 8},
        {'name': 'Sanjana Kothari', 'role': 'research_outreach_head', 'batch': '2022-27', 'order': 9},
        {'name': 'Aahini Gandhi', 'role': 'research_outreach_head', 'batch': '2022-27', 'order': 10},
        {'name': 'Ayush Aryan', 'role': 'student_mentor', 'batch': '2020 – 2025', 'order': 11},
        {'name': 'Aarsh Soni', 'role': 'mediation_cell_head', 'batch': '2020 – 2025', 'order': 12}
    ]
    
    for member_data in team_members:
        team_member, created = TeamMember.objects.get_or_create(
            name=member_data['name'],
            defaults={**member_data, 'active': True}
        )
        if created:
            print(f"Created team member: {team_member.name}")
    
    print("Sample data creation completed!")

if __name__ == '__main__':
    create_sample_data()
