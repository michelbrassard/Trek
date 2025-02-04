from django.db import models

# Create your models here.

class User(models.Model):
    created = models.DateTimeField(auto_now_add=True)

#https://www.django-rest-framework.org/tutorial/1-serialization/#creating-a-model-to-work-with