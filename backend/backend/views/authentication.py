from rest_framework.response import Response
from rest_framework.views import APIView
from backend.serializers import CookieAuthenticationSerializer, RegisterUserSerializer
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, TokenError


class RegisterUserView(APIView):
    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data={'detail' : 'Account Created Successfully'}, status=status.HTTP_201_CREATED)
        return Response(data={'detail': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class CookieAuthenticationView(APIView):
    def post(self, request):
        serializer = CookieAuthenticationSerializer(data=request.data)
        if serializer.is_valid():
            
            response = Response(status=200)
            
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
                max_age=3600,
                value=str(serializer.validated_data['refresh']),
                httponly=True,
                samesite='Lax',
                path= '/authentication/refresh/'
            )
            return response
        return Response("It's assss", status=401)
    
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