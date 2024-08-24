from django.contrib import admin
from .models import (
    Department,
    ManageDeparment,
    Major,
    Subject,
    Prerequisite,
    Semester,
    Teaching,
    Group,
)


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ("name", "is_active")
    search_fields = ("name",)
    list_filter = ("is_active",)


@admin.register(ManageDeparment)
class ManageDeparmentAdmin(admin.ModelAdmin):
    list_display = ("department", "lecturer", "is_active", "start_date", "end_date")
    search_fields = ("department__name", "lecturer__user__username")
    list_filter = ("is_active", "start_date", "end_date")


@admin.register(Major)
class MajorAdmin(admin.ModelAdmin):
    list_display = ("name", "is_active", "number_of_courses", "department")
    search_fields = ("name", "department__name")
    list_filter = ("is_active", "department")


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = (
        "name_en",
        "name_ar",
        "hours",
        "semester_number",
        "units",
        "is_offered",
    )
    search_fields = ("name_en", "name_ar")
    list_filter = ("is_offered", "semester_number")


@admin.register(Prerequisite)
class PrerequisiteAdmin(admin.ModelAdmin):
    list_display = ("subject", "prerequisite_subject")
    search_fields = ("subject__name_en", "prerequisite_subject__name_en")


@admin.register(Semester)
class SemesterAdmin(admin.ModelAdmin):
    list_display = ("name", "start_date", "end_date")
    search_fields = ("name",)
    list_filter = ("start_date", "end_date")


@admin.register(Teaching)
class TeachingAdmin(admin.ModelAdmin):
    list_display = ("subject", "lecturer", "semester")
    search_fields = ("subject__name_en", "lecturer__user__username", "semester__name")
    list_filter = ("semester",)


@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ("name", "semester", "advisor")
    search_fields = ("name", "semester__name", "advisor__user__username")
    list_filter = ("semester",)
