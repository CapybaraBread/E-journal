from django.urls import path
from . import views

urlpatterns = [
    path('', views.main_page, name='main_page'),
    path('grades/<class_name>', views.grades, name='grades'),
    path('users', views.users, name='users'),
]
