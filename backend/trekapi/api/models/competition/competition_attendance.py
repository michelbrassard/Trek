from django.db import models
from ..user import User
from . import Competition

class CompetitionAttendance(models.Model):
    attendantId = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id', related_name="user_competition_attendance")
    competitionId = models.ForeignKey(Competition, on_delete=models.CASCADE, to_field='id', related_name="competition_attendance")
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['attendantId', 'competitionId'], name='unique_competition_attendance')
        ]