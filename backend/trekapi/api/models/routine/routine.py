from django.db import models
from ..user import User
import uuid

class Routine(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    creatorId = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id', related_name="creator_routine")
    title = models.CharField(max_length=50)
    description = models.TextField()
    frequency = models.CharField(max_length=50)