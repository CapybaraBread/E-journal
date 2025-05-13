from django.db import models
from django.contrib.auth.models import AbstractUser
from main.models import Classes


class User(AbstractUser):
    fio = models.CharField(default="", max_length=50)
    role = models.CharField(max_length=32, default='student', choices=[('student', 'student'), ('teacher', 'teacher'), ('admin', 'admin')])
    password = models.CharField(default="", max_length=128)
    stud_class = models.ForeignKey(
        Classes,
        on_delete=models.CASCADE,
        verbose_name='Класс',
        related_name='students',
        null=True,
        blank=True
    )

    def __str__(self):
        return self.fio


class Subjects(models.Model):
    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name='Ученик',
        related_name='marks',
        blank=True,
        primary_key=True,
        default=''
    )
    history = models.CharField(choices=[('5', '5'), ('4', '4'), ('3', '3'), ('2', '2'), ('', '')], max_length=1, null=True, blank=True, default='')
    algebra = models.CharField(choices=[('5', '5'), ('4', '4'), ('3', '3'), ('2', '2'), ('', '')], max_length=1, null=True, blank=True, default='')
    chemistry = models.CharField(choices=[('5', '5'), ('4', '4'), ('3', '3'), ('2', '2'), ('', '')], max_length=1, null=True, blank=True, default='')
    drawing = models.CharField(choices=[('5', '5'), ('4', '4'), ('3', '3'), ('2', '2'), ('', '')], max_length=1, null=True, blank=True, default='')
    physics = models.CharField(choices=[('5', '5'), ('4', '4'), ('3', '3'), ('2', '2'), ('', '')], max_length=1, null=True, blank=True, default='')
    geometry = models.CharField(choices=[('5', '5'), ('4', '4'), ('3', '3'), ('2', '2'), ('', '')], max_length=1, null=True, blank=True, default='')
    music = models.CharField(choices=[('5', '5'), ('4', '4'), ('3', '3'), ('2', '2'), ('', '')], max_length=1, null=True, blank=True, default='')
    literature = models.CharField(choices=[('5', '5'), ('4', '4'), ('3', '3'), ('2', '2'), ('', '')], max_length=1, null=True, blank=True, default='')

    def __str__(self):
        return self.student.fio