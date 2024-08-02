from django.shortcuts import render,get_object_or_404,redirect
from .form import *
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import requires_csrf_token
from django.core.files.storage import FileSystemStorage
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger



# Create your views here.



def main_page(request):
    posts = BlogPost.objects.filter(published=True).order_by('-pub_date')[:5]
    return render(request, 'website/main/index.html',{"posts":posts})



def about_page(request):
    return render(request,'website/about/about.html')




def news_page(request):
    return render(request,"website/news/news.html")



@login_required
def  user_center(request):
    return  render(request,"management/home/index.html")



@login_required
def blog_mangment(request):
    all_posts = BlogPost.objects.all()  # Consider filtering by published status
    paginator = Paginator(all_posts, 8)  # Adjust posts_per_page as needed

    page_number = request.GET.get('page')  # Get current page from GET parameters

    try:
        page_obj = paginator.page(page_number)
    except PageNotAnInteger:
        page_obj = paginator.page(1)  # Go to the first page if invalid page number
    except EmptyPage:
        page_obj = paginator.page(paginator.num_pages)  # Go to the last page if out of range

    context = {
        'posts': page_obj,
        'paginator': paginator,
        'page_number': page_number,
    }

    return render(request, 'management/website/management.html', context)


@login_required
def blog_create(request):
    if request.method == "POST":
        post_form = CreateBlogPost(request.POST,request.FILES)
        if post_form.is_valid():
            post = post_form.save(commit=False)  # Don't commit yet
            post.save()  # Save the BlogPost instance
            return JsonResponse({"Success":"تمت العملية بنجاح"},status=200)
        else: 
            return JsonResponse({"Erorr": "حدث خطأ ما "},status=400)
    form = CreateBlogPost()
    return render(request,'management/website/create.html',{
        'form':form,
    })


@login_required
def blog_edit(request,id):
    post = get_object_or_404(BlogPost,id=id)
    if request.method == "POST":
        form = CreateBlogPost(request.POST,request.FILES,instance=post)
        if form.is_valid():
            form = form.save(commit=False)
            form.save()
            return redirect(f'blogPost {post.id}')
        else:
             print(form.errors)
    else:
        form = CreateBlogPost(instance=post)
        return render(request,"management/website/edit.html",{'form':form})


def post(request,id):
    post = get_object_or_404(BlogPost,id=id)
    latest_posts=BlogPost.objects.filter(published=True).order_by('-pub_date')[:5]
    context = {'post':post,"posts":latest_posts}
    return render(request,"website/blog/blogPost.html",context)










