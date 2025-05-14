from django.contrib import admin
from .models import Classes
from users.models import Subjects

admin.site.register(Subjects)
admin.site.register(Classes)
# Register your models here.
