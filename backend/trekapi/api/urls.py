from django.urls import path
from api import views

urlpatterns = [
    path('', views.home),
    path('users/', views.user_list),
    path('user/details/', views.user_detail),
    path('auth/register/', views.register_view, name='register'),
    path('auth/login/', views.login_view, name='login')
]