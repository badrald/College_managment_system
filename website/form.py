from django import forms
from .models import BlogPost,Category

class CreateBlogPost(forms.ModelForm):
    class Meta:
        model = BlogPost
        fields = ['title','category','post_cover','body'] # Adjust fields as needed
        widgets = { 
            'category':forms.Select(attrs={"class":"form-control"}),
        }   




class CategoryForm(forms.ModelForm):
    """A form for adding a new category to the database."""
    class Meta:
        model=Category
        fields = ['name']
        