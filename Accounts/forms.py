from django import forms
from django.contrib.auth.models import User 
from .models import Profile
from django.contrib.auth.forms import UserCreationForm,UserChangeForm

class UserForm(UserCreationForm):
    class Meta:
        model= User 
        fields = ("username",'email','first_name','last_name',"password1","password2",)


class EditUserForm(UserChangeForm):
    class Meta:
        model = User
        fields = ("username",'email','first_name','last_name')
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'اسم المستخدم'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'البريد الالكتروني'}),
            'first_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'الاسم الاول'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'الاسم الاخير'}),
        }
        labels = {
            'username': 'اسم المستخدم',
            'email': 'البريد الالكتروني',
            'first_name': 'الاسم الاول',
            'last_name': 'الاسم الاخير',
        }


class EditProfileForm(forms.ModelForm):
    class Meta:
        model= Profile
        fields = '__all__'
        exclude= ('user',)
        widgets={
            "national_number":forms.NumberInput(attrs={"placeholder":"الرقم الوطني"}),
            "address":forms.TextInput(attrs={"placeholder":"العنوان"}),
            "phone_number":forms.NumberInput(attrs={"placeholder":"رقم الهاتف"}),
            "job_title":forms.TextInput(attrs={"placeholder":"المسمى الوظيفي"})
        }
        labels = {
            'national_number': 'الرقم الوطني',
            'address': 'العنوان',
            'phone_number': 'رقم الهاتف',
            'user_photo': 'الصورة الشخصية',
            'job_title': 'المسمى الوظيفي',
            }




