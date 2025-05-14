from django.db import models
from .user import User
import uuid

#this is accessible to athletes through the team table
class Resource(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    creatorId = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id', related_name="creator_resources")
    title = models.CharField(max_length=50)
    description = models.TextField()
    url = models.URLField()
