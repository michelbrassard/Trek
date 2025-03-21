from django.urls import path
from api import views

urlpatterns = [
    path('', views.home),
    path('auth/register/', views.register_view, name='register'),
    path('auth/login/', views.login_view, name='login'),
    path('auth/logout', views.logout_view, name='logout'),
    path('users/', views.user_list),
    path('user/details/', views.user_detail),
    path('user/role', views.user_role),
    path('enroll/temporaryCodes', views.get_coach_codes),
    path('athletes/', views.athlete_list),
    path('athletes/<uuid:athlete_id>/', views.athlete_detail),
]