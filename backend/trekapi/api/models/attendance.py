from django.db import models
from .user import User
from .workout import Workout

# fix Id -> id
class WorkoutAttendance(models.Model):
    attendentId = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id', related_name="user_attendence")
    workoutId = models.ForeignKey(Workout, on_delete=models.CASCADE, to_field='id', related_name="workout_attendence")