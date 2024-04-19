from django.shortcuts import render
from django.contrib.auth.decorators import login_required


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