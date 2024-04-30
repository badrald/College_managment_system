from django import forms
from .models import BlogPost,Image

class CreateBlogPost(forms.ModelForm):
    class Meta:
        model = BlogPost
        fields = ('title', 'content',)  # Adjust fields as needed
        widgets = {
            'content': forms.Textarea(attrs={'rows': 10}),  # Optional: adjust content area size
        }



class ImageForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ('image',)  # Only the image field