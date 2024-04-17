from django.shortcuts import render

# Create your views here.


def main_page(request):
    return render(request, 'website/main/index.html')



def about_page(request):
    return render(request,'website/about/about.html')




def news_page(request):
    return render(request,"website/news/news.html")