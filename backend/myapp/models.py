from django.db import models

# Create your models here.

class Customer(models.Model):
    first_name = models.CharField(max_length = 30)
    last_name = models.CharField(max_length = 30)
    email = models.EmailField(max_length = 50)
    phone = models.CharField(max_length = 11)

