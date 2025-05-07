from django.contrib import admin # type: ignore (it works)
from .models import User, Team, TemporaryCoachCode, Workout, WorkoutAttendance, Competiton, CompetitionAttendance
from django.urls import path

class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'role')  
    search_fields = ['email', 'first_name', 'last_name'] 
    list_filter = ('role',) 

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.all()

# Register your models here so that they appear in the admin site
admin.site.register(User, UserAdmin)
admin.site.register(Team)
admin.site.register(TemporaryCoachCode)
admin.site.register(Workout)
admin.site.register(WorkoutAttendance)
admin.site.register(Competiton)
admin.site.register(CompetitionAttendance)