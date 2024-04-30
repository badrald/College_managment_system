from django.db import models
from Core.settings import MEDIA_ROOT
from Accounts.models import Profile
import os
import uuid

# Create your models here.

def upload_pic_blog(instance, filename):
    blog_imges = os.path.join(MEDIA_ROOT , "blog_images")
    if not os.path.exists(blog_imges):
        os.makedirs(blog_imges)

    ext = filename.split('.')[1]
    new_file_name= f'blog_images/{instance.title}_{uuid.uuid4()}.{ext}'
    new_file_path=os.path.join(MEDIA_ROOT,new_file_name)

    if os.path.exists(new_file_path):
        os.remove(new_file_path)

    return new_file_name


class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)  # Date and time published

    def __str__(self):
        return self.title

class Image(models.Model):
    blog_post = models.ForeignKey(BlogPost, on_delete=models.CASCADE)  # Link to BlogPost
    image = models.ImageField(upload_to=upload_pic_blog) 

    def __str__(self):
        return self.title if self.title else f'Image - {self.id}'
    


class MediaUser(Profile):
    pass

