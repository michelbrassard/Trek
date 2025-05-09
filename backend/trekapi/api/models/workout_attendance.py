from django.db import models
from .user import User
from .workout import Workout

class WorkoutAttendance(models.Model):
    createdAt = models.DateTimeField(auto_now_add=True)
    attendantId = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id', related_name="user_attendance")
    workoutId = models.ForeignKey(Workout, on_delete=models.CASCADE, to_field='id', related_name="workout_attendance")
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['attendantId', 'workoutId'], name='unique_workout_attendance')
        ]
    