from django.db import models
from django.utils.timezone import now
from ..user import User

class Team(models.Model):
    coachId = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id', related_name="coached_teams")
    athleteId = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id', related_name="athlete_teams")
    createdAt = models.DateTimeField(auto_now_add=True)