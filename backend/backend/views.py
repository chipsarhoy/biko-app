from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from .serializers import CustomerSerializer, MenuSerializer
from myapp.models import Menu, Customer
from rest_framework.permissions import IsAuthenticated
from .CookieAuthenticationSerializer import CookieAuthenticationSerializer
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

class CookieAuthenticationView(APIView):
    def post(self, request):
        serializer = CookieAuthenticationSerializer(data=request.data)
        if serializer.is_valid():
            
            response = Response()
            
            response.set_cookie(
            key='access',
            value=str(serializer.validated_data['access']),
            max_age=600,
            httponly=True,
            samesite='Lax',
            path='/'
            )

            response.set_cookie(
                key='refresh',
                max_age=1200,
                value=str(serializer.validated_data['refresh']),
                httponly=True,
                samesite='Lax',
                path='/'
            )
            return response
        return Response({'Message': "It's asssss"})

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