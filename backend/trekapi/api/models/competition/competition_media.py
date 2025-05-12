from django.db import models
from backend.trekapi.api.models.media import Media
from ..user import User
from . import Competition

class CompetitionMedia(models.Model):
    athleteId = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id', related_name="athlete_competition_media")
    competitionId = models.ForeignKey(Competition, on_delete=models.CASCADE, to_field='id', related_name="competition_media")
    mediaId = models.ForeignKey(Media, on_delete=models.CASCADE, to_field='id', related_name='file_competition_media')
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['athleteId', 'competitionId', 'mediaId'], name='unique_competition_media')
        ]