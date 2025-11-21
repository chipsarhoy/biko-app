from rest_framework.views import APIView
from rest_framework.response import Response
from backend import serializers
from myapp.models import Menu
from rest_framework import status


class MenuView(APIView):
    def get(self, request):
        menu = Menu.objects.all()
        serializer = serializers.MenuSerializer(menu, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = serializers.MenuSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'detail': request.data["name"] + "successfully added"}, status=status.HTTP_201_CREATED)
        return Response({'detail': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
class OrderView(APIView):
    def post(self, request):
        serializer = serializers.CustomerOrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)