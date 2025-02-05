from django.contrib import admin # type: ignore (it works)
from .models import Role, User


# Register your models here so that they appear in the admin site
admin.site.register(Role)
admin.site.register(User)