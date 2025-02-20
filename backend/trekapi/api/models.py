from django.db import models # type: ignore - works normally
import uuid

class Role(models.Model):
    role_name = models.CharField(max_length=15)
    class Meta:
        ordering = ['role_name']

# Create your models here.
class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=30)
    username = models.CharField(max_length=15, unique=True)
    email = models.EmailField()
    password = models.CharField(max_length=60)
    phone = models.CharField(max_length=15)
    date_of_birth = models.DateTimeField()
    role = models.ForeignKey(Role, on_delete=models.RESTRICT)
    
    #add for filtering?
    class Meta:
        ordering = ['last_name']
        #unique_together = ('name', 'email') if multiple fields together have to be unique
        """ permissions = [
            ("can_view_reports", "Can view reports"),
            ("can_edit_users", "Can edit users"),
        ] """


