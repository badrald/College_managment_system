from django.urls import path 
from . import views


urlpatterns = [
    path('login',views.login_view,name='login_view'),
    path('',views.logout_view,name='logout_view'),
    path("الملف-الشخصي/",views.profile_view,name='profile'),
    path('تعديل-ملف-شخصي/<int:id>',views.profile_edit,name="profile_edit"),
    path('profiles/',views.profiles_view,name="profiles"),
    path("delete_user/<int:id>",views.delete_user,name='delete_user'),
    path("password/<int:id>",views.change_password,name="change_password")
    
]