from django.shortcuts import render,HttpResponse

# Create your views here.

def mainview(request):
    return render(request,'main.html')
