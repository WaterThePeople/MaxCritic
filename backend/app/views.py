from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CustomAuthTokenSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class CustomAuthToken(APIView):

    def post(self, request, *args, **kwargs):
        serializer = CustomAuthTokenSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)

