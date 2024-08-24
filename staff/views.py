from django.shortcuts import render, redirect
from django.http import JsonResponse
from Accounts.models import StudentProfile, StaffProfile, MediaProfile
from Accounts.forms import CustomUserCreationForm
import pandas as pd

# Create your views here.
def students_profiles_view(request):
    if request.method == "POST":
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({"success": "تمت عملية اضامة المستخدم بنجاح"})
        else:
            return JsonResponse({"error": form.error_messages}, status=400)
    profiles = StudentProfile.objects.all()

    context = {
        "profiles": profiles,
    }
    return render(request, "management/accounts/profiles.html", context)




def students_from_file(request):
    form = ExcelUploadForm(request.POST, request.FILES)
    if form.is_valid():
        excel_file = request.FILES["excel_file"]
        try:
            df = pd.read_excel(excel_file)  # Use 'pd.read_excel' to read Excel files
        except Exception as e:
            return JsonResponse(
                {"error": f"Error reading the Excel file: {str(e)}"}, status=400
            )
        added_records = []
        updated_records = []
        for index, row in df.iterrows():
            try:

                employee = Employee(
                    name=row["الاسم"],
                    national_number=row["الرقم الوطني"],
                    sex=False if row["الرقم الوطني"] > 200000000000 else True,
                    date_start=row["تاريخ المباشرة"],
                    graduation_date=row["تاريخ التخرج"],
                    specialization=row["التخصص"],
                    nationality="ليبي",
                    qualification=row["المؤهل"],
                    attendees=row["مستمر في العمل"] != "لا",
                    added_by=request.user,
                )
                added_records.append(employee.name)
                employee.save()
                print(row["مستمر في العمل"])
            except Exception as e:
                print("Error Message:", str(e))

        response_data = {
            "success": "File uploaded successfully",
            "added_records": added_records,
            "updated_records": updated_records,
        }
        return JsonResponse(response_data, status=200)
    else:
        return JsonResponse(
            {"error": "هناك خطأ في الملف تأكد من الصيغة الجداول"}, status=400
        )
