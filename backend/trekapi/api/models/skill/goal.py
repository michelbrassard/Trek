from django.db import models
from ..user import User
import uuid

class Goal(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    skillId = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id', related_name="skill_goals")
    title = models.CharField(max_length=50)
    description = models.TextField()