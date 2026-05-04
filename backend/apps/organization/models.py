from django.db import models
import uuid

class Company(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Companies"

class Entity(models.Model):
    TYPE_CHOICES = [
        ('production', 'Production'),
        ('support', 'Support'),
        ('development', 'Development'),
        ('mixed', 'Mixed'),
    ]
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='entities')
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True)
    entity_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='production')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.company.code} - {self.name}"

    class Meta:
        verbose_name_plural = "Entities"
