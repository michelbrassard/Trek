from django.db import models
from .user import User
import uuid

# this is private to the creator
class Note(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    creatorId = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id', related_name="creator_notes")
    title = models.CharField(max_length=50)
    note = models.TextField()
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateField(null=True, blank=True)
