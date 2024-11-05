from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CustomAuthTokenSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from .pagination import Pagination
from ..games.models import Game
from ..games.serializers import GamesSerializer


class CustomAuthToken(APIView):

    def post(self, request, *args, **kwargs):
        serializer = CustomAuthTokenSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


class RecentlyAddedView(APIView):

    def get(self, request, *args, **kwargs):
        paginator = Pagination()
        games = Game.objects.all()
        games_serializer = GamesSerializer(games, many=True)
        recent_games = [
            {**game, 'type': 'Game'} for game in games_serializer.data if game['recently_added']]

        return paginator.get_paginated_response(paginator.paginate_queryset(recent_games, request))

        # data = {
        #     'data': paginator.paginate_queryset(recent_games, request),
        # }

        # return paginator.get_paginated_response(data)
