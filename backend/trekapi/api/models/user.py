import uuid
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field is required")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)  # Hash password
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        return self.create_user(username, email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=30)
    username = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    password = models.TextField()
    phone = models.CharField(max_length=15)
    date_of_birth = models.DateTimeField()
    role = models.CharField(max_length=30)
    
    # For Django auth
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "email" 
    REQUIRED_FIELDS = ["username", "first_name", "last_name", "role", "date_of_birth"]
    
    #add for filtering?
    class Meta:
        ordering = ['last_name']
        #unique_together = ('name', 'email') if multiple fields together have to be unique
        """ permissions = [
            ("can_view_reports", "Can view reports"),
            ("can_edit_users", "Can edit users"),
        ] """
