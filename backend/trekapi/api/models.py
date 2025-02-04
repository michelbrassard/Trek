from django.db import models # type: ignore - works normally

# Create your models here.

class User(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.TextField()
    
    class Meta:
        ordering = ['name']
