from django.db import models
from django.contrib.auth.models import AbstractUser
from main.models import Classes


class User(AbstractUser):
    fio = models.CharField(default="", max_length=32)
    role = models.CharField(max_length=32, default='student', choices=[('student', 'student'), ('teacher', 'teacher'), ('admin', 'admin')])
    student_class = models.ForeignKey(Classes, on_delete=models.CASCADE,  verbose_name='Класс', related_name='Пользователь', blank=True, null=True)
    password = models.CharField(default="", max_length=128)

    def __str__(self) -> str:
        return self.username
