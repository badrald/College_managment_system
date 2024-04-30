from django.shortcuts import render,redirect,get_object_or_404
from django.urls import reverse
from django.contrib.auth import authenticate, login,logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.contrib.auth.decorators import user_passes_test
from .models import Profile,User
from .forms import *



def is_superuser(user):
    return user.is_superuser
def superuser_required(view_func):
    return user_passes_test(lambda u: u.is_superuser)(view_func)


# Create your views here.
def login_view(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is None:
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                return JsonResponse({"error": "اسم المستخدم او كلمة المرور غير صحيحة"}, status=400)
        else:
            login(request, user)
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                return JsonResponse({"success": "تم تسجيل الدخول بنجاح"})
            return redirect('/')


@login_required(login_url="page_not_found")
def logout_view(request):
    logout(request)
    return redirect('/')


@login_required(login_url="page_not_found")
def profile(request, id):
    if id:
        profile=get_object_or_404(Profile,id=id)
        return render(request,'management/accounts/profile.html',{"profile":profile})   
    profile=get_object_or_404(Profile,user=request.user)
    return render(request,'management/accounts/profile.html',{"profile":profile})


@login_required(login_url="page_not_found")
@superuser_required
def profile_edit(request,id):
    profile=get_object_or_404(Profile,id=id)
    if request.user.profile.job_place.id == 1 or profile.job_place == request.user.profile.job_place :
        if request.method == 'POST' and "permissions" not in request.POST:
            formProfile = EditProfileForm(request.POST,request.FILES ,instance=profile)
            formUser=EditUserForm(request.POST,instance=profile.user)
            if formProfile.is_valid() and formUser.is_valid():
                formUser.save()
                myprofile = formProfile.save(commit=False)
                myprofile.user = profile.user
                myprofile.save()
                return JsonResponse({"success":"تم تحديث بيانات الحساب بنجاح"},status=200)
        if "permissions" in request.POST:
                give_permissions(request,profile.user)
        userForm = EditUserForm(instance=profile.user)
        profileForm=EditProfileForm(instance=profile)
        context = {"userForm":userForm,
                   "profileForm":profileForm,
                   "profile":profile}
        
        return render(request,"management/accounts/profile_edit.html",context)
    return redirect(reverse("page_not_found"))


def give_permissions(request ,user):
        permission=request.POST['permissions']
        if permission == 'staff':
            user.is_staff=True
            user.is_superuser=False
        elif permission == 'super':
            user.is_superuser=True
            user.is_staff=True
        else :
            user.is_staff=False
            user.is_superuser=False
        user.is_active=True
        user.save()
        return 



@login_required(login_url="page_not_found")
@superuser_required
def delete_user(request,id):
    user_delete=get_object_or_404(User,id=id)
    try:
        if request.method == "POST":
            if request.user == user_delete:
                return JsonResponse({"error":"هذا المستخدم قيد الاستعمال حاليا , تعذر عملية الحذف "},status=400)
            else:
                user_delete.delete()
                return JsonResponse({'success':"تمت عملية حذف المستخدم بنجاح"},status=200)
            
    except:
        return JsonResponse({"error":"هناك خطأ في الفورم"},status=500)
    return render(request,"management/accounts/delete_user.html",{'user':user_delete})


@login_required(login_url="page_not_found")
@superuser_required
def profiles_view(request):
    if request.method == "POST":
        form = UserForm(request.POST)
        if form.is_valid():
            form.save()
            give_permissions(request,User.objects.last())
            print(request.POST)
            last_profile = Profile.objects.last()
            last_profile.save()
            return JsonResponse({'success':"تمت عملية اضامة المستخدم بنجاح"})
        else :
            return JsonResponse({'error':form.error_messages},status=400)
    profiles=Profile.objects.all()
    context = {"profiles":profiles}
    return render(request , 'management/accounts/profiles.html',context)

@login_required(login_url="page_not_found")
def profile_view(request):
    profile=get_object_or_404(Profile,user=request.user)
    if profile.user.is_superuser :
        perm="مستخدم مع صلاحيات المدير يمكنه الوصول الى جميع الوظائف"
    elif profile.user.is_staff and not profile.user.is_superuser:
        perm="مستخدم مع صلاحيات تعديل و البحث"
    else: 
        perm="مستخدم مع صلاحيات البحث فقط"
    return render(request,"management/accounts/profile.html",{"profile":profile,"perm":perm})


@login_required(login_url='page_not_found')
def change_password(request,id):
    user=get_object_or_404(User,id=id)
    if request.method == 'POST':
        new_password = request.POST['new_password1']
        user.set_password(new_password)
        user.save()
        success_msg = "تم عملية تغير كلمة المرور بنجاح"
        if request.user == user:
            success_msg="تمت تغير كلمة المرور بنجاح سيتم توجهيك الى صفحة تسجيل الدخول !"
        response = JsonResponse({'success': success_msg},status=200) 
        return response
    return render(request, 'accounts/change-password.html',{'id':id})