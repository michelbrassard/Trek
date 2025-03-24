from django.db import models
from .user import User
from .workout import Workout

class WorkoutAttendence(models.Model):
    attendentID = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id', related_name="user_attendence")
    workoutID = models.ForeignKey(Workout, on_delete=models.CASCADE, to_field='id', related_name="workout_attendence")