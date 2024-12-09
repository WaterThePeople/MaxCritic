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
from rest_framework.exceptions import NotFound
from itertools import zip_longest

from ..games.models import Game
from ..games.serializers.serializers import GamesSerializer
from ..movies.models import Movie
from ..movies.serializers.serializers import MoviesSerializer
from ..shows.models import Show
from ..shows.serializers.serializers import ShowsSerializer
from ..music.models import Song
from ..music.serializers.serializers import SongsSerializer


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
        songs = Song.objects.filter(name__icontains=query)

        combined_results = list(games) + list(movies) + \
            list(shows) + list(songs)

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
            elif isinstance(result, Song):
                serializer = SongSerializer(result)

            serialized_data.append(serializer.data)

        return paginator.get_paginated_response(serialized_data)


class RecentlyAddedView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        recent_games = Game.objects.order_by('-created_at')[:3]
        recent_movies = Movie.objects.order_by('-created_at')[:3]
        recent_shows = Show.objects.order_by('-created_at')[:3]
        recent_songs = Song.objects.order_by('-created_at')[:3]

        games_data = GamesSerializer(recent_games, many=True).data
        movies_data = MoviesSerializer(recent_movies, many=True).data
        shows_data = ShowsSerializer(recent_shows, many=True).data
        songs_data = SongsSerializer(recent_songs, many=True).data

        interwoven_items = []
        for items in zip_longest(games_data, movies_data, shows_data, songs_data):
            for item in items:
                if item:
                    interwoven_items.append(item)

        return Response(interwoven_items)
