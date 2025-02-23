from django.urls import path
from api import views

urlpatterns = [
    path('', views.home),
    path('users/', views.user_list),
    path('users/<uuid:pk>/', views.user_detail),
    path('api/register/', views.register_view, name='register'),
    path('api/login/', views.login_view, name='login')
]