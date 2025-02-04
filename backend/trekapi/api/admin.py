from django.contrib import admin # type: ignore (it works)
from .models import User

# Register your models here so that they appear in the admin site
admin.site.register(User)