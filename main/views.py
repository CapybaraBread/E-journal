from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse
from .forms import CreateClassForm, AddStudentClassForm, CreateMarksForm, CreateNewsForm, UserRoleChangeForm
from .models import Classes, News
from users.models import Subjects, User
from django.http import HttpResponseNotFound


def main_page(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse('registration'))
    news = News.objects.filter(role="gs")
    classes_info = []
    classes = Classes.objects.all()
    for class_info in classes:
        classes_info.append({
            "stud_count": len(class_info.students.all()),
            "class": class_info
        })
    form_classes = CreateClassForm(data=request.POST)
    form_stud_class = AddStudentClassForm(data=request.POST)
    news_form = CreateNewsForm(data=request.POST)
    if request.method == "POST":
        if form_classes.is_valid():
            form_classes.save()
            return HttpResponseRedirect(reverse('main_page'))
        if form_stud_class.is_valid():
            try:
                Subjects.objects.get(student=request.POST.get("student"))
            except Exception:
                stud_id = request.POST.get("student")
                values_for_update = {"history": "", "algebra": "", "chemistry": "", "drawing": "", "physics": "",
                                     "geometry": "", "music": "", "literature": "",
                                     "student": User.objects.get(id=stud_id), }
                Subjects.objects.update_or_create(student=stud_id, defaults=values_for_update)
            form_stud_class = AddStudentClassForm(data=request.POST,
                                                  instance=User.objects.get(id=request.POST.get("student")))
            form_stud_class.save()
            return HttpResponseRedirect(reverse('main_page'))
        if news_form.is_valid():
            News.objects.create(title=request.POST.get("title"), text=request.POST.get("text"), role="gs")
            return HttpResponseRedirect(reverse('main_page'))
    context: dict[str, str] = {
        'classes_info': classes_info,
        "form_classes": form_classes,
        "add_class_form": form_stud_class,
        'user': request.user,
        'news_form': news_form,
        'news': news,
    }
    return render(request, 'gs.html', context=context)


def grades(request, class_name):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse('registration'))
    news = News.objects.filter(role=class_name)
    if request.user.role == "student" and request.user.stud_class.class_name != class_name:
        return HttpResponseRedirect(reverse('grades', kwargs={"class_name": request.user.stud_class.class_name}))
    class_i = Classes.objects.get(class_name=class_name)
    marks = []
    for student in class_i.students.all():
        marks.append({
            "student": student.fio,
            "marks": Subjects.objects.get(student=student)
        })
    news_form = CreateNewsForm(data=request.POST)
    form = CreateMarksForm(data=request.POST, class_name=class_name)
    if request.method == "POST":
        if news_form.is_valid():
            News.objects.create(title=request.POST.get("title"), text=request.POST.get("text"), role=class_name)
            return HttpResponseRedirect(reverse('grades', kwargs={"class_name": class_name}))
        values_for_update = {f"{request.POST.get('subjects')}": request.POST.get('marks')}
        Subjects.objects.update_or_create(student=User.objects.get(id=request.POST.get("student")),
                                          defaults=values_for_update)
        return HttpResponseRedirect(reverse('grades', kwargs={"class_name": class_name}))
    context: dict[str, str] = {
        'marks': marks,
        'form': form,
        'class_name': class_name,
        'news_form': news_form,
        'news': news,
    }
    return render(request, 'grades.html', context=context)


def users(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse('registration'))
    if request.user.role != "admin":
        return HttpResponseNotFound()
    else:
        form = UserRoleChangeForm(data=request.POST, user=request.user.id)
        if request.method == "POST":
            form = UserRoleChangeForm(data=request.POST, instance=User.objects.get(id=request.POST.get("user")), user=request.user.id)
            print(request.user.id)
            if form.is_valid():
                form.save()
                return HttpResponseRedirect(reverse('users'))
        users = User.objects.exclude(id=request.user.id)
        context: dict[str, str] = {
            'users': users,
            'form': form
        }
        return render(request, 'mk.html', context=context)
