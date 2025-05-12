from django.db import models
from . import Progress

# this is private to the creator
class ProgressContent(models.Model):
    progressId = models.ForeignKey(Progress, on_delete=models.CASCADE, to_field='id', related_name="progress_content")
    createdAt = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    