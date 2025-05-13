from django.db import models
from django.db.models import CharField


class News(models.Model):
    title = models.TextField(null=True, blank=True)
    text = models.TextField(null=True, blank=True)
    role = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.student


class Classes(models.Model):
    class_name = models.CharField(primary_key=True, max_length=10, blank=True, default='')
    cl_teacher = models.CharField(max_length=30, null=True, blank=True)

    def __str__(self) -> CharField:
        return self.class_name
