from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from .serializers import CustomerSerializer, CustomerOrderSerializer, MenuSerializer, CookieAuthenticationSerializer
from myapp.models import Menu, Customer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
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
            max_age=10,#600,
            httponly=True,
            samesite='Lax',
            path='/'
            )

            response.set_cookie(
                key='refresh',
                max_age=60,#3600,
                value=str(serializer.validated_data['refresh']),
                httponly=True,
                samesite='Lax',
                path= '/authentication/refresh/'
            )
            return response
        return Response("It's assss")

class AuthenticationRefreshView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh')

        if refresh_token is None:
            return Response({'detail': 'Refresh token cookie missing'}, status=status.HTTP_401_UNAUTHORIZED)  

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            response = Response()
            response.set_cookie(
                key='access',
                max_age=600,
                value=access_token,
                httponly=True,
                samesite='Lax',
                path='/'
                )
        except TokenError:
            return Response({'detail': 'Invalid or expired token'}, status=status.HTTP_401_UNAUTHORIZED)
        
        return response
        
class Logout(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('access')
        response.delete_cookie('refresh')
        return response

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postNewOrder(request):
    serializer = CustomerOrderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=200)
    else:
        return Response(serializer.errors, status=400)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addMenuItem(request):
    serializer = MenuSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(status=200)
    