from rest_framework import serializers
from rest_framework_simplejwt.authentication import JWTAuthentication
from myapp.models import Customer, Menu, Order, OrderItems
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import exceptions
from typing import Any

class CookieAuthenticator(JWTAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get('access')
        if token is None:
            return None

        try:
            validated_token = self.get_validated_token(token)
            return self.get_user(validated_token), validated_token
        except Exception as e:
            raise exceptions.AuthenticationFailed('Invalid or expired token')
        
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['first_name', 'last_name', 'email', 'phone']

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ['name', 'description', 'price']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['Customer_ID', 'price_total', 'price_subtotal', 'price_tax']

class OrderItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItems
        fields = ['quantity', 'Menu_ID', 'Order_ID']

class CustomerOrderSerializer(serializers.Serializer):
    customer = CustomerSerializer(source='Customer_ID')
    order_items = serializers.DictField(child=serializers.IntegerField(), write_only=True)
    
    def create(self, validated_data):
        customer_data = validated_data.pop('Customer_ID')
        order_items_data = validated_data.pop('order_items')

        # Create customer
        customer = Customer.objects.create(**customer_data)
        
        # Calculate price
        price_subtotal = 0.0
        for key, value in order_items_data.items():
            
            price =  Menu.objects.filter(name=key).values_list('price', flat=True)
            price_subtotal = price_subtotal + price[0] * value

        # Create order
        order = Order.objects.create(Customer_ID=customer, price_subtotal=price_subtotal, price_tax=price_subtotal*0.05, price_total=price_subtotal+(price_subtotal*0.05))

        # Identify order items with order and menu
        for key, value in order_items_data.items():
            OrderItems.objects.create(quantity=value, Menu_ID=Menu.objects.get(name=key), Order_ID=order)

        return order
        

class CookieAuthenticationSerializer(TokenObtainPairSerializer):

    def validate(self, attrs: dict[str, Any]):
        token = super().validate(attrs)

        return {'access': token.get('access'), 'refresh': token.get('refresh')}