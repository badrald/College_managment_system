from django.db import models
from Core.settings import MEDIA_ROOT
from Accounts.models import MediaProfile
from django.utils.text import slugify
from tinymce import models as tinymce_models

import os
import uuid

# Create your models here.


def upload_pic_blog(instance, filename):
    blog_imges = os.path.join(MEDIA_ROOT, "blog_images")
    if not os.path.exists(blog_imges):
        os.makedirs(blog_imges)

    ext = filename.split(".")[1]
    new_file_name = f"blog_images/covers/{instance.title}_{instance.id}.{ext}"
    new_file_path = os.path.join(MEDIA_ROOT, new_file_name)

    if os.path.exists(new_file_path):
        os.remove(new_file_path)

    return new_file_name


class Category(models.Model):
    name = models.CharField(max_length=50)
    url = models.SlugField(unique=True, max_length=60)

    def save(self, *args, **kwargs):
        self.url = slugify(self.name)
        super(Category, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    created_by = models.ForeignKey(
        MediaProfile, related_name="created_blog_post", on_delete=models.CASCADE
    )
    title = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    post_cover = models.ImageField(upload_to=upload_pic_blog, null=True, blank=True)
    pub_date = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(allow_unicode=True)
    published = models.BooleanField(default=True)
    body = tinymce_models.HTMLField(blank=True, null=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(BlogPost, self).save(*args, **kwargs)
