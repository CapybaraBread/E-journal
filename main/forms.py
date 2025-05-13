from django import forms
from .models import Classes, News
from users.models import User, Subjects


marks = (
    ("5", "5"),
    ("4", "4"),
    ("3", "3"),
    ("2", "2"),
)

roles = (
    ("teacher", "Учитель"),
    ("admin", "Админ"),
    ("student", "Ученик"),
)

subjects = (
    ("history", "История"),
    ("algebra", "Алгебра"),
    ("chemistry", "Химия"),
    ("drawing", "Рисование"),
    ("physics", "Физика"),
    ("geometry", "Геометрия"),
    ("music", "Музыка"),
    ("literature", "Литература"),
)


class AllMarksChangeForm(forms.ModelForm):

    class Meta:
        model = Subjects
        fields = "__all__"

    history = forms.ChoiceField(
        required=False,
        choices=marks
    )

    algebra = forms.ChoiceField(
        required=False,
        choices=marks
    )

    chemistry = forms.ChoiceField(
        required=False,
        choices=marks
    )

    drawing = forms.ChoiceField(
        required=False,
        choices=marks
    )

    physics = forms.ChoiceField(
        required=False,
        choices=marks
    )

    geometry = forms.ChoiceField(
        required=False,
        choices=marks
    )

    music = forms.ChoiceField(
        required=False,
        choices=marks
    )

    literature = forms.ChoiceField(
        required=False,
        choices=marks
    )


class CreateClassForm(forms.ModelForm):
    class Meta:
        model = Classes
        fields = "__all__"

    class_name = forms.CharField(
        widget=forms.TextInput(),
        required=True
    )

    cl_teacher = forms.CharField(
        widget=forms.TextInput(),
        required=True
    )


class CreateNewsForm(forms.ModelForm):
    class Meta:
        model = News
        fields = "__all__"

    title = forms.CharField(
        widget=forms.TextInput(),
        required=True
    )

    text = forms.CharField(
        widget=forms.Textarea(),
        required=True
    )


class CreateMarksForm(forms.ModelForm):
    class Meta:
        model = Subjects
        fields = "__all__"

    student = forms.ModelChoiceField(queryset=User.objects.none(), required=True)

    marks = forms.ChoiceField(choices=marks, required=True)

    subjects = forms.ChoiceField(choices=subjects, required=True)

    now_mark = forms.CharField()

    def __init__(self, *args, **kwargs):
        class_name = kwargs.pop('class_name', None)
        super().__init__(*args, **kwargs)

        self.fields['student'].queryset = User.objects.filter(stud_class=class_name)


class AddStudentClassForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('stud_class',)

    stud_class = forms.ModelChoiceField(queryset=Classes.objects.all(), required=True)
    student = forms.ModelChoiceField(queryset=User.objects.filter(role="student"), required=True)


class UserRoleChangeForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('role',)

    user = forms.ModelChoiceField(queryset=User.objects.none(), required=True)
    role = forms.ChoiceField(choices=roles)

    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)
        self.fields['user'].queryset = User.objects.exclude(id=user)
