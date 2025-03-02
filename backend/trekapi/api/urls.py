from django.urls import path
from api import views

urlpatterns = [
    path('', views.home),
    path('auth/register/', views.register_view, name='register'),
    path('auth/login/', views.login_view, name='login'),
    path('users/', views.user_list),
    path('user/details/', views.user_detail)
]