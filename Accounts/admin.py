from django.contrib import admin
from .models import User, LecturerProfile, StaffProfile, StudentProfile, MediaProfile

# Register your models here.


admin.site.register(StaffProfile)
admin.site.register(LecturerProfile)
admin.site.register(StudentProfile)
admin.site.register(MediaProfile)
admin.site.register(User)
