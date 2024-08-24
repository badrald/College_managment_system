from django.db import models


class Department(models.Model):
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class ManageDeparment(models.Model):
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    lecturer = models.ForeignKey("Accounts.LecturerProfile", on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)


class Major(models.Model):
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    number_of_courses = models.IntegerField()
    department = models.ForeignKey(
        Department, null=True, on_delete=models.SET_NULL, related_name="major_deparment"
    )

    def __str__(self):
        return self.name


class Subject(models.Model):
    name_en = models.CharField(max_length=50)
    name_ar = models.CharField(max_length=50)
    sub_id = models.CharField(max_length=10)
    hours = models.IntegerField()
    semester_number = models.IntegerField()
    units = models.IntegerField()
    is_offered = models.BooleanField(default=True)

    def __str__(self):
        return self.name_en


class Prerequisite(models.Model):
    subject = models.ForeignKey(
        Subject, on_delete=models.CASCADE, related_name="main_subject"
    )
    prerequisite_subject = models.ForeignKey(
        Subject, on_delete=models.CASCADE, related_name="prerequisite_subject"
    )


class Semester(models.Model):
    name = models.CharField(max_length=50)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return self.name


class Teaching(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    lecturer = models.ForeignKey("Accounts.LecturerProfile", on_delete=models.CASCADE)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("subject", "lecturer", "semester")

    def __str__(self):
        return f"د . {self.lecturer.user.get_full_name()} يدرس {self.subject.name_ar} في {self.semester.name}"


class Group(models.Model):
    name = models.CharField(max_length=100)  # اسم المجموعة
    description = models.TextField(
        null=True, blank=True
    )  # وصف المجموعة (يمكن أن يكون فارغاً)
    semester = models.ForeignKey(
        Semester, on_delete=models.CASCADE, related_name="groups"
    )  # ارتباط بالفصل الدراسي
    students = models.ManyToManyField(
        "Accounts.StudentProfile", related_name="groups"
    )  # ارتباط بالطلاب
    advisor = models.ForeignKey(
        "Accounts.LecturerProfile",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="groups",
    )  # ارتباط بالمشرف (يمكن أن يكون فارغاً)

    def __str__(self):
        return self.name  # عرض اسم المجموعة عند تحويل الكائن إلى سلسلة نصية
