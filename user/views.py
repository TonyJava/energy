from django.shortcuts import render,HttpResponse

# Create your views here.

def userview(request):
    return render(request,'user/user.html')
