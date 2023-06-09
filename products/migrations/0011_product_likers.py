# Generated by Django 4.1.5 on 2023-04-15 10:53

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('products', '0010_alter_product_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='likers',
            field=models.ManyToManyField(related_name='products_liked', to=settings.AUTH_USER_MODEL),
        ),
    ]
