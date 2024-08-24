from django.contrib import admin
from django.urls import path,include
from django.conf.urls.static import static 
from . import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include("website.urls")), # Include urls from website app
    path('ckeditor/',include("ckeditor_uploader.urls")),
    path('tinymce/', include('tinymce.urls')), 
    path('accounts/',include("Accounts.urls")),
    
]

urlpatterns += static(settings.MEDIA_URL , document_root=settings.MEDIA_ROOT)

