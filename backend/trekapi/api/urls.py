from django.urls import path
from api import views

# from django.conf import settings
# from django.conf.urls.static import static
# from django.urls import path

# add / at the end of a request if it doesn't work
urlpatterns = [
    path('', views.home),
    
    #registration
    path('auth/register/', views.register_view, name='register'),
    path('auth/login/', views.login_view, name='login'),
    path('auth/logout', views.logout_view, name='logout'),
    path('auth/refresh', views.refresh_token),
    
    #users
    path('users/', views.user_list),
    path('users/details/', views.user_detail),
    path('users/role', views.user_role),
    path('users/email/', views.user_check_email_existence),
    path('users/username', views.user_check_username_existence),
    
    #athletes 
    path('enroll/temporary_codes', views.coach_codes),
    path('athletes/', views.athlete_list),
    path('athletes/<uuid:athlete_id>/', views.athlete_detail),
    
    #workouts
    path('workouts/', views.workout_list),
    path('workouts/<uuid:workout_id>/', views.workout_detail),
    path('workouts/attendance/', views.workout_attendance_list),
    path('workouts/attendance/<uuid:workout_id>/', views.current_workout_attendance),
    
    #competition
    path('competitions/', views.competition_list),
    path('competitions/<uuid:competition_id>/', views.competition_detail),
    path('competitions/attendance/', views.competition_attendance_list),
    path('competitions/attendance/<uuid:competition_id>/', views.current_competition_attendance),
    
    #note
    path('notes/', views.note_list),
    path('notes/<uuid:note_id>/', views.note_detail),
    
    #resource
    path('resources/', views.resource_list),
    path('resources/<uuid:resource_id>/', views.resource_detail),

    #search
    path('search/', views.search_data),
    
    #media
    path('media/', views.media_list),
    path('media/<uuid:media_id>', views.media_detail),
    
    #progress
    path('progress/', views.progress_list),
    path('progress/versions/', views.progress_with_all_content_versions_list),
    path('progress/<uuid:progress_id>', views.progress_detail),
    path('progress/<uuid:progress_id>/save/', views.save_new_version),
    path('progress/<uuid:progress_id>/versions/', views.progress_with_all_content_versions),
    
]

# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)