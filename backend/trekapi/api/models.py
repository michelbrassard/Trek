from django.db import models # type: ignore - works normally

# Create your models here.
class User(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.TextField()
    
    #add for filtering?
    class Meta:
        ordering = ['name']
        #unique_together = ('name', 'email')
        """ permissions = [
            ("can_view_reports", "Can view reports"),
            ("can_edit_users", "Can edit users"),
        ] """
