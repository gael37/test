# Generated by Django 4.1.5 on 2023-04-13 16:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0005_user_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='likes',
            field=models.CharField(blank=True, default=None, max_length=1000, null=True),
        ),
    ]