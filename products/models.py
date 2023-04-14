from django.db import models
import datetime
# Create your models here.


class Product(models.Model):
    description = models.TextField(max_length=1000)
    price = models.CharField(max_length=15)
    image = models.CharField(max_length=300)
    created_at = models.DateTimeField(
        auto_now_add=True)
    dimensions = models.CharField(
        max_length=50, default=None, blank=True, null=True)
    weight = models.CharField(
        max_length=50, default=None, blank=True, null=True)
    about = models.CharField(
        max_length=1000, default=None, blank=True, null=True)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='products',
        on_delete=models.CASCADE
    )
    categories = models.ManyToManyField(
        'categories.Category',
        related_name="products"
    )

    def __str__(self):
        return f"{self.description}"
