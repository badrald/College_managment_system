from django.shortcuts import render
from .form import *
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse


# Create your views here.


def main_page(request):
    return render(request, 'website/main/index.html')



def about_page(request):
    return render(request,'website/about/about.html')




def news_page(request):
    return render(request,"website/news/news.html")



@login_required
def  user_center(request):
    return  render(request,"management/home/index.html")



@login_required
def blog_mangment(request):
    return render(request,'management/website/blog_management.html')


@login_required
def blog_create(request):
    if request.method == "POST":
        post_form = CreateBlogPost(request.POST)
        image_formset = ImageForm(request.POST, request.FILES)  # Empty queryset
        if post_form.is_valid() and image_formset.is_valid():
            post = post_form.save(commit=False)  # Don't commit yet
            post.save()  # Save the BlogPost instance

            for form in image_formset:
                image = form.save(commit=False)  # Don't commit yet
                image.blog_post = post  # Associate image with the saved post
                image.save()  # Save the Image instance

            return JsonResponse({"Success":"تمت العملية بنجاح"},status=200)
        else:
            print(post_form.errors, image_formset.errors)  # Log errors for debugging
            return JsonResponse({"Erorr": "حدث خطأ ما "},status=400)
    form = CreateBlogPost()
    image_formset = ImageForm()
    return render(request,'management/website/blog_create.html',{
        'form':form,
        'image_formset':image_formset,
    })