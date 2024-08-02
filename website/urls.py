from django.urls import  path
from . import views

urlpatterns = [
    path('',views.main_page,name='main_page'),
    path('حول-الكلية',views.about_page,name='about'),
    path('الاخبار',views.news_page,name='news'),
    path('لوحة-التحكم',views.user_center,name="control"),
    path('ادارة-الاخبار',views.blog_mangment,name="blog_management"),
    path('انشاء-خبر',views.blog_create,name="blog_create"),
    path('منشور/<int:id>',views.post,name="blogPost"),
    path('تعديل-منشور/<int:id>',views.blog_edit,name="blog_edit"),

]
