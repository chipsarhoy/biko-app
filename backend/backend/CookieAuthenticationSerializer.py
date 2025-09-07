from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response
from typing import Any

class CookieAuthenticationSerializer(TokenObtainPairSerializer):

    def validate(self, attrs: dict[str, Any]):
        token = super().validate(attrs)
        
        return {'access': token.get('access'), 'refresh': token.get('refresh')}