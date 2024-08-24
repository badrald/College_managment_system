from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import User, StudentProfile, LecturerProfile, StaffProfile, MediaProfile


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "phone_number",
            "national_number",
            "user_type",
            "user_photo",
            "password1",
            "password2",
        )


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "phone_number",
            "national_number",
            "user_type",
            "user_photo",
        )


class StudentProfileForm(forms.ModelForm):
    class Meta:
        model = StudentProfile
        fields = ("user", "student_id", "semester", "department", "major")


class LecturerProfileForm(forms.ModelForm):
    class Meta:
        model = LecturerProfile
        fields = ("user", "date_of_hire", "department")


class StaffProfileForm(forms.ModelForm):
    class Meta:
        model = StaffProfile
        fields = ("user", "date_of_hire")


class MediaProfileForm(forms.ModelForm):
    class Meta:
        model = MediaProfile
        fields = ("user", "date_of_hire")
