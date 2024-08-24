from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Enrollment(models.Model):
    student = models.ForeignKey(
        "Accounts.StudentProfile", on_delete=models.CASCADE, related_name="enrollments"
    )
    subject = models.ForeignKey(
        "courses.Subject", on_delete=models.CASCADE, related_name="enrollments"
    )
    semester = models.ForeignKey(
        "courses.Semester", on_delete=models.CASCADE, related_name="enrollments"
    )
    enrollment_date = models.DateField(auto_now_add=True)

    class Meta:
        unique_together = ("student", "subject", "semester")

    def __str__(self):
        return f"{self.student.user.get_full_name()} - {self.subject.name_ar} - {self.semester.name}"
