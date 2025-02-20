from django.urls import path
from api import views

urlpatterns = [
    path('', views.home),
    path('users/', views.user_list),
    path('users/<uuid:pk>/', views.user_detail)
]