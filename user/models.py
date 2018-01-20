from django.db import models

# Create your models here.
class userinfo(models.Model):
    user_name = models.CharField(max_length= 30)
    password = models.CharField(max_length= 64)
    # gender = models.IntegerField(max_length=1)  #性别 0表示男，1表示女
    gender = models.CharField(max_length= 1)
    telphone = models.CharField(max_length= 20, null=True)
    email = models.CharField(max_length= 32, null=True)
    name = models.CharField(max_length= 10, null=True)
    # bid = models.BigIntegerField()
