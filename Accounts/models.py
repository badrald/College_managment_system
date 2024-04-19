from django.db import models
from django.contrib.auth.models import User 
from django.db.models.signals import post_save
from django.dispatch import receiver
from Core.settings import MEDIA_ROOT
import os 

# Create your models here.

def upload_pics(inctence,pic):
    profile_folder = os.path.join(MEDIA_ROOT , "Porfiles")
    if not os.path.exists(profile_folder):
        os.makedirs(profile_folder)
    
    new_file_name= f"Profiles/{inctence.id}.{pic.split('.')[1]}"
    new_filePath= os.path.join(MEDIA_ROOT , new_file_name)

 
    if os.path.exists(new_filePath):
        os.remove(new_filePath)
    return new_file_name

class Profile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    national_number= models.BigIntegerField(blank=True,null=True)
    address= models.CharField(max_length=50, blank=True, null=True)
    phone_number=models.CharField(max_length=15,null=True,blank=True)
    user_photo=models.ImageField(upload_to=upload_pics,null=True,blank=True)
    job_title= models.CharField(max_length=50,blank=True,null=True)
    def __str__(self) :
        if self.user.first_name =='' or self.user.first_name == None:
            return self.user.username
        return self.user.first_name + " "+ self.user.last_name
    
    
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)





