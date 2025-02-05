from django.db import models # type: ignore - works normally

class Role(models.Model):
    roleName = models.CharField(max_length=15)
    class Meta:
        ordering = ['roleName']

# Create your models here.
class User(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    firstName = models.CharField(max_length=20)
    lastName = models.CharField(max_length=30)
    username = models.CharField(max_length=15, unique=True)
    email = models.EmailField()
    password = models.CharField(max_length=60)
    phone = models.CharField(max_length=15)
    dateOfBirth = models.DateTimeField()
    role = models.ForeignKey(Role, on_delete=models.RESTRICT)
    
    #add for filtering?
    class Meta:
        ordering = ['name']
        #unique_together = ('name', 'email') if multiple fields together have to be unique
        """ permissions = [
            ("can_view_reports", "Can view reports"),
            ("can_edit_users", "Can edit users"),
        ] """


