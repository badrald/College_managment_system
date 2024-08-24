# Generated by Django 4.2.11 on 2024-08-05 16:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("courses", "0001_initial"),
        ("Accounts", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="studentprofile",
            name="department",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="courses.department"
            ),
        ),
        migrations.AddField(
            model_name="studentprofile",
            name="user",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="student_profile",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="staffprofile",
            name="user",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="staff_profile",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="mediaprofile",
            name="user",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="media_profile",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="lecturerprofile",
            name="user",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="lecturer_profile",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]