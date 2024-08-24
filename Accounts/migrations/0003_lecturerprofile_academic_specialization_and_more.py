# Generated by Django 4.2.11 on 2024-08-07 18:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("courses", "0002_subject_sub_id_alter_major_department_and_more"),
        ("Accounts", "0002_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="lecturerprofile",
            name="academic_specialization",
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name="lecturerprofile",
            name="degrees",
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name="lecturerprofile",
            name="department",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="lecturer_deparment",
                to="courses.department",
            ),
        ),
        migrations.AddField(
            model_name="studentprofile",
            name="major",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="student_major",
                to="courses.major",
            ),
        ),
        migrations.AlterField(
            model_name="studentprofile",
            name="department",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="student_deparment",
                to="courses.department",
            ),
        ),
    ]