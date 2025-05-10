from django.db import models
from backend.trekapi.api.models.media import Media
from .user import User
from .workout import Workout

class WorkoutMedia(models.Model):
    athleteId = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id', related_name="athlete_workout_media")
    workoutId = models.ForeignKey(Workout, on_delete=models.CASCADE, to_field='id', related_name="workout_media")
    mediaId = models.ForeignKey(Media, on_delete=models.CASCADE, to_field='id', related_name='file_workout_media')
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['athleteId', 'workoutId', 'mediaId'], name='unique_workout_media')
        ]