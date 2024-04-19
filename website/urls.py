from django.urls import  path
from . import views

urlpatterns = [
    path('',views.main_page,name='main_page'),
    path('حول-الكلية',views.about_page,name='about'),
    path('الاخبار',views.news_page,name='news'),
    path('لوحة-التحكم',views.user_center,name="control"),
]
