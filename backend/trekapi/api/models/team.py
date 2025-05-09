import uuid
from django.db import models
from datetime import timedelta
from django.utils.timezone import now
from .user import User

class TemporaryCoachCode(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    coachId = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id')

class Team(models.Model):
    coachId = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id', related_name="coached_teams")
    athleteId = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id', related_name="athlete_teams")
    createdAt = models.DateTimeField(auto_now_add=True)