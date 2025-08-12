from django.db import models

# Create your models here.

class Customer(models.Model):
    first_name = models.CharField(max_length = 30)
    last_name = models.CharField(max_length = 30)
    email = models.EmailField(max_length = 50)
    phone = models.CharField(max_length = 11)

class Menu(models.Model):
    name = models.CharField(max_length = 50)
    description = models.CharField(max_length = 200)
    price = models.FloatField()

class Order(models.Model):
    Customer_ID = models.ForeignKey(Customer, on_delete=models.PROTECT, default=None)
    price_total = models.FloatField()
    price_subtotal = models.FloatField()
    price_tax = models.FloatField()

class OrderItems(models.Model):
    quantity = models.IntegerField()
    Menu_ID = models.ForeignKey(Menu, on_delete=models.PROTECT, default=None)
    Order_ID = models.ForeignKey(Order, on_delete=models.PROTECT, default=None)

