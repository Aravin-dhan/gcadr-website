import os
import yaml
from django.core.management.base import BaseCommand
from core.models import TeamMember, Leadership


class Command(BaseCommand):
    help = 'Import team data from YAML files'

    def add_arguments(self, parser):
        parser.add_argument(
            '--content-dir',
            type=str,
            default='../content/team',
            help='Directory containing team YAML files'
        )

    def handle(self, *args, **options):
        content_dir = options['content_dir']
        
        if not os.path.exists(content_dir):
            self.stdout.write(
                self.style.ERROR(f'Content directory {content_dir} does not exist')
            )
            return
        
        self.stdout.write(f'Importing team data from {content_dir}...')
        
        # Import team members
        team_file = os.path.join(content_dir, 'team-members.yaml')
        if os.path.exists(team_file):
            self.import_team_members(team_file)
        
        # Import leadership
        leadership_file = os.path.join(content_dir, 'leadership.yaml')
        if os.path.exists(leadership_file):
            self.import_leadership(leadership_file)
        
        self.stdout.write(self.style.SUCCESS('✅ Team data import completed!'))

    def import_team_members(self, filepath):
        """Import team members from YAML file"""
        with open(filepath, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)
        
        team_members = data.get('team_members', [])
        imported_count = 0
        
        for member_data in team_members:
            try:
                # Map YAML fields to model fields
                member_id = member_data.get('id')
                
                # Create or update team member
                member, created = TeamMember.objects.update_or_create(
                    id=member_id,
                    defaults={
                        'name': member_data.get('name', ''),
                        'role': self.get_role_choice(member_data.get('position', '')),
                        'batch': member_data.get('year', ''),
                        'email': member_data.get('email', ''),
                        'linkedin_url': member_data.get('linkedin_url', ''),
                        'bio': member_data.get('bio', ''),
                        'order': member_data.get('order', 0),
                        'active': member_data.get('active', True),
                    }
                )
                
                # Handle image path
                image_path = member_data.get('image', '')
                if image_path and not member.image:
                    # Store relative path for now
                    # In production, you'd copy the actual file
                    member.image = image_path.replace('/media/', '')
                    member.save()
                
                imported_count += 1
                action = "Created" if created else "Updated"
                self.stdout.write(f'✅ {action}: {member.name}')
                
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f'❌ Failed to import {member_data.get("name", "Unknown")}: {str(e)}')
                )
        
        self.stdout.write(f'👥 Imported {imported_count} team members')

    def import_leadership(self, filepath):
        """Import leadership from YAML file"""
        with open(filepath, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)
        
        leadership_members = data.get('leadership', [])
        imported_count = 0
        
        for leader_data in leadership_members:
            try:
                leader_id = leader_data.get('id')
                
                # Create or update leadership member
                leader, created = Leadership.objects.update_or_create(
                    id=leader_id,
                    defaults={
                        'name': leader_data.get('name', ''),
                        'position': leader_data.get('position', ''),
                        'bio': leader_data.get('bio', ''),
                        'email': leader_data.get('email', ''),
                        'order': leader_data.get('order', 0),
                    }
                )
                
                # Handle image path
                image_path = leader_data.get('image', '')
                if image_path and not leader.image:
                    leader.image = image_path.replace('/media/', '')
                    leader.save()
                
                imported_count += 1
                action = "Created" if created else "Updated"
                self.stdout.write(f'✅ {action}: {leader.name}')
                
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f'❌ Failed to import {leader_data.get("name", "Unknown")}: {str(e)}')
                )
        
        self.stdout.write(f'👔 Imported {imported_count} leadership members')

    def get_role_choice(self, position):
        """Map position string to role choice"""
        position_lower = position.lower()
        
        role_mapping = {
            'convenor': 'convenor',
            'co-convenor': 'co_convenor',
            'secretary': 'secretary',
            'co-secretary': 'co_secretary',
            'treasurer': 'treasurer',
            'co-treasurer': 'co_treasurer',
            'social media head': 'social_media_head',
            'it and blog head': 'it_head',
            'research and outreach head': 'research_head',
            'student mentor': 'mentor',
            'mediation cell head': 'mediation_head',
        }
        
        return role_mapping.get(position_lower, 'member')
