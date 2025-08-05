# Generated migration for carousel title customization

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_create_superuser'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carouselimage',
            name='title',
            field=models.CharField(blank=True, help_text='Optional title overlay on image', max_length=200),
        ),
        migrations.AddField(
            model_name='carouselimage',
            name='title_color',
            field=models.CharField(choices=[('white', 'White'), ('black', 'Black'), ('primary', 'Primary Blue'), ('golden', 'Golden'), ('red', 'Red'), ('green', 'Green')], default='white', help_text='Color of the title text', max_length=20),
        ),
        migrations.AddField(
            model_name='carouselimage',
            name='show_title',
            field=models.BooleanField(default=True, help_text='Whether to show title on image'),
        ),
    ]
