from django.db import models
from django.contrib.auth.models import AbstractUser
from Core.settings import MEDIA_ROOT
import os

# Create your models here.


def upload_pics(instance, pic):
    profile_folder = os.path.join(MEDIA_ROOT, "Profiles")
    if not os.path.exists(profile_folder):
        os.makedirs(profile_folder)
    profile_type = instance.user_type
    new_file_name = f"Profiles/{profile_type}/{instance.id}.{pic.split('.')[1]}"
    new_filePath = os.path.join(MEDIA_ROOT, new_file_name)

    if os.path.exists(new_filePath):
        os.remove(new_filePath)
    return new_file_name


class User(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    user_photo = models.ImageField(upload_to=upload_pics, null=True, blank=True)
    national_number = models.CharField(max_length=13, blank=True, null=True)
    nationality = models.CharField(max_length=50, blank=True, null=True)

    USER_TYPES = (
        ("student", "Student"),
        ("lecturer", "Lecturer"),
        ("admin", "Admin"),
        ("media", "Media"),
    )
    user_type = models.CharField(max_length=20, choices=USER_TYPES, default="student")

    @property
    def is_student(self):
        return self.user_type == "student"

    @property
    def is_lecturer(self):
        return self.user_type == "lecturer"

    @property
    def is_admin(self):
        return self.user_type == "admin"

    @property
    def is_media(self):
        return self.user_type == "media"


class StudentProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="student_profile"
    )
    student_id = models.IntegerField()
    semester = models.IntegerField()
    department = models.ForeignKey(
        "courses.Department",
        null=True,
        on_delete=models.SET_NULL,
        related_name="student_deparment",
    )
    major = models.ForeignKey(
        "courses.Major",
        null=True,
        on_delete=models.SET_NULL,
        related_name="student_major",
    )

    def __str__(self):
        return self.user.get_full_name()


class LecturerProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="lecturer_profile"
    )
    department = models.ForeignKey(
        "courses.Department",
        null=True,
        on_delete=models.SET_NULL,
        related_name="lecturer_deparment",
    )
    date_of_hire = models.DateField()
    academic_specialization = models.CharField(
        max_length=50, blank=True, null=True
    )  # التخصص الاكاديمي
    degrees = models.CharField(max_length=20, blank=True, null=True)  # الشهادة العلمية

    def __str__(self):
        return self.user.get_full_name()


class StaffProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="staff_profile"
    )
    date_of_hire = models.DateField()


class MediaProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="media_profile"
    )
    date_of_hire = models.DateField()
