from django.db import models
from .user import User
import uuid

class Competiton(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    coachId = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id', related_name="creator_competitions")
    title = models.CharField(max_length=50)
    description = models.TextField()
    startDate = models.DateField(null=True, blank=True)
    endDate = models.DateField(null=True, blank=True)
    location = models.TextField()
    url = models.URLField()