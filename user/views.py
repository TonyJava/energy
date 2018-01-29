from django.shortcuts import render,HttpResponse,redirect
from django import forms
import re
import json
from . import models

# Create your views here.
def mobile_validate(value):
    mobile_re = re.compile(r'^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$')
    if not mobile_re.match(value):
        raise ValidationError('手机号码格式错误')

class AddUserForm(forms.Form):
    user_gender_choice = ((0,u'女'),(1,u'男'))

    user_name = forms.CharField(required=True,error_messages={'required':'姓名不允许为空！'})
    user_gender = forms.IntegerField(widget=forms.widgets.Select(choices=user_gender_choice))
    user_telphone = forms.CharField(required=False,validators=[mobile_validate,],)
    user_email = forms.EmailField
    user_userName = forms.CharField(required=True,error_messages={'required':'用户名不允许为空！'})
    user_password = forms.CharField()
    pass

def userview(request):
    data = models.userinfo.objects.all()
    print(data)
    return render(request,'user/user.html',{'userinfos':data})

# 添加用户
def addUserInfo(request):
    result = {}
    if request.method == 'POST':
        user_input_obj = AddUserForm(request.POST)
        if user_input_obj.is_valid():
            data = user_input_obj.clean()
            print(data)
            user_name = data['user_name']
            user_gender = data['user_gender']
            user_telphone = data['user_telphone']
            user_userName = data['user_userName']
            user_password = data['user_password']

            models.userinfo.objects.create(user_name=user_userName,password=user_password,gender=user_gender,
                                           telphone=user_telphone,name=user_name)

            result['message'] = '添加成功'
            return redirect('/user/')
            # return HttpResponse(json.dumps(result))
        else:
            error_msg = user_input_obj.errors
            result = error_msg.as_json()
            print(result)
            # return HttpResponse(result)
            return render(request,'user/user.html',{'obj':user_input_obj,'errors_msg':result})
    pass
