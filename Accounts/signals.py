from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import StudentProfile, LecturerProfile, MediaProfile, StaffProfile

User = get_user_model()


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.is_student:
            # Create a student profile
            StudentProfile.objects.create(user=instance)
        elif instance.is_lecturer:
            # Create a lecturer profile
            LecturerProfile.objects.create(user=instance)
        elif instance.is_admin:
            # Create an admin profile
            StaffProfile.objects.create(user=instance)
        elif instance.is_media:
            # Create a media profile
            MediaProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if instance.is_student:
        instance.studentprofile.save()
    elif instance.is_lecturer:
        instance.lecturerprofile.save()
    elif instance.is_admin:
        instance.adminprofile.save()
    elif instance.is_media:
        instance.mediaprofile.save()
