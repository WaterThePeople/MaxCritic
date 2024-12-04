from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from django.db.models import Q
from rest_framework import status
from .serializers.login import *
from .serializers.register import *
from .serializers.user import *
from .serializers.profile import *
from .serializers.search import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from ..pagination import Pagination
from ..games.models import Game
from ..games.serializers.serializers import GamesSerializer
from rest_framework.exceptions import NotFound


class CustomAuthToken(APIView):
    permission_classes = [AllowAny]

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
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


class UserImageView(APIView):
    # user image add image as blob to body to add/change current photo, pass empty body to delete image
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = UserImageSerializer(
            user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Image updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangeUsernameView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        serializer = ChangeUsernameSerializer(data=request.data)
        if serializer.is_valid():
            new_username = serializer.validated_data['new_username']
            user = request.user
            user.username = new_username
            user.save()
            return Response({"message": "Username updated successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Password updated successfully."}, status=status.HTTP_200_OK)
        return Response({"error": serializer.errors.get("error", "Invalid data provided.")}, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, username):
        try:
            user = CustomUser.objects.prefetch_related(
                'game_reviews', 'movie_reviews').get(username=username)
        except CustomUser.DoesNotExist:
            raise NotFound("User not found")

        serializer = UserProfileSerializer(user)
        return Response(serializer.data)


class SearchView(APIView):
    pagination_class = Pagination

    def get(self, request, *args, **kwargs):
        query = self.request.query_params.get('q', '')

        games = Game.objects.filter(name__icontains=query)
        movies = Movie.objects.filter(name__icontains=query)
        shows = Show.objects.filter(name__icontains=query)

        combined_results = list(games) + list(movies) + list(shows)

        paginator = self.pagination_class()
        paginated_results = paginator.paginate_queryset(
            combined_results, request)

        serialized_data = []
        for result in paginated_results:
            if isinstance(result, Game):
                serializer = GameSerializer(result)
            elif isinstance(result, Movie):
                serializer = MovieSerializer(result)
            elif isinstance(result, Show):
                serializer = ShowSerializer(result)

            serialized_data.append(serializer.data)

        return paginator.get_paginated_response(serialized_data)


class RecentlyAddedView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        paginator = Pagination()
        games = Game.objects.all().order_by('-created_at')
        games_serializer = GamesSerializer(games, many=True)
        recent_games = [
            {**game, 'type': 'Game'}
            for game in games_serializer.data
            if game['recently_added'] and game['released']
        ]

        return paginator.get_paginated_response(paginator.paginate_queryset(recent_games, request))

        # data = {
        #     'data': paginator.paginate_queryset(recent_games, request),
        # }

        # return paginator.get_paginated_response(data)
