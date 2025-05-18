from django.db import models
from .goal import Goal

class GoalDependency(models.Model):
    goalId = models.ForeignKey(Goal, on_delete=models.CASCADE, to_field='id', related_name="goal_with_dependency")
    prerequisiteGoalId = models.ForeignKey(Goal, on_delete=models.CASCADE, to_field='id', related_name="prerequisite_goal")
    isCompleted = models.BooleanField(default=False)