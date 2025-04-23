from django.db import models
from users.models import User


class Subjects(models.Model):
    history = models.CharField(choices=[('5', '5'), ('4', '4'), ('3', '3'), ('2', '2')], max_length=1, null=True, blank=True)
    algebra = models.CharField(choices=[('5', '5'), ('4', '4'), ('3', '3'), ('2', '2')], max_length=1, null=True, blank=True)
    chemistry = models.CharField(choices=[('5', '5'), ('4', '4'), ('3', '3'), ('2', '2')], max_length=1, null=True, blank=True)
    drawing = models.CharField(choices=[('5', '5'), ('4', '4'), ('3', '3'), ('2', '2')], max_length=1, null=True, blank=True)
    physics = models.CharField(choices=[('5', '5'), ('4', '4'), ('3', '3'), ('2', '2')], max_length=1, null=True, blank=True)
    math = models.CharField(choices=[('5', '5'), ('4', '4'), ('3', '3'), ('2', '2')], max_length=1, null=True, blank=True)

    def __str__(self):
        return self.id


class Classes(models.Model):
    class_name = models.CharField(max_length=10, null=True, blank=True)
