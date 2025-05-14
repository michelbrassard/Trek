import uuid
from django.db import models
from ..user import User

class TemporaryCoachCode(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    coachId = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id')