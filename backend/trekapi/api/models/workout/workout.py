from django.db import models
from ..user import User
import uuid

class Workout(models.Model):
    # uuid used here because the workout ID will be used in the link
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    creatorId = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id', related_name="creator_workouts")
    title = models.CharField(max_length=50)
    description = models.TextField()
    workout = models.TextField()
    date = models.DateField(null=True, blank=True)
    length = models.IntegerField() # distance or time...
    unit = models.CharField(max_length=20) # meters, hours, minutes...

