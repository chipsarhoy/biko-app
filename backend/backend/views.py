from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import CustomerSerializer, MenuSerializer
from myapp.models import Menu, Customer
from rest_framework.permissions import IsAuthenticated
# Create your views here.

@api_view()
def getMenu(request):
    menu = Menu.objects.all()
    serializer = MenuSerializer(menu, many=True)
    return Response(serializer.data)

@api_view()
def getCustomer(request):
    customer = Customer.objects.get(pk=1)
    serializer = CustomerSerializer(customer, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postCustomer(request):
    serializer = CustomerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addMenuItem(request):
    serializer = MenuSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)