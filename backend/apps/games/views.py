from rest_framework import generics
from .serializers.serializers import *
from .serializers.budget import *
from .serializers.categories import *
from .serializers.developer import *
from .serializers.esrb import *
from .serializers.platforms import *
from .serializers.publisher import *
from .serializers.reviews import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .filters import GameFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework.generics import ListAPIView
from django.db.models import Avg
from ..pagination import Pagination
from django.shortcuts import get_object_or_404
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK


class GameCategoriesView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = GameCategoriesSerializer
    queryset = GameCategory.objects.all()


class GamePlatformsView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = GamePlatformsSerializer
    queryset = GamePlatform.objects.all()


class GameESRBView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = GameESRBSerializer
    queryset = GameESRB.objects.all()


class GameBudgetView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = GameBudgetSerializer
    queryset = GameBudget.objects.all()


class GamesView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = GamesSerializer
    queryset = Game.objects.all()


class GameReviewCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = GameCreateReviewSerializer(
            data=request.data, context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GameReviewDeleteView(APIView):
    def delete(self, request, id):
        try:
            review = GameReview.objects.get(id=id)
            review.delete()
            return Response({'message': 'Review deleted successfully'}, status=status.HTTP_200_OK)
        except GameReview.DoesNotExist:
            return Response({'error': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)


class GameReviewEditView(APIView):
    def put(self, request, id):
        try:
            review = GameReview.objects.get(id=id)
        except GameReview.DoesNotExist:
            return Response({"error": "Review not found."}, status=status.HTTP_404_NOT_FOUND)
        if review.author != request.user and not request.user.is_staff:
            return Response({"error": "You are not authorized to edit this review."}, status=status.HTTP_403_FORBIDDEN)
        serializer = GameEditReviewSerializer(
            review, data=request.data, context={'request': request}
        )
        if serializer.is_valid():
            updated_review = serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GameView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, slug):
        try:
            item = Game.objects.get(slug=slug)
            serializer = GameSerializer(item, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Game.DoesNotExist:
            return Response({"error": "Game not found"}, status=status.HTTP_404_NOT_FOUND)


class GamesListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = GamesListSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = GameFilter
    ordering_fields = ['average_score', 'release_date']
    ordering = ['-average_score']
    pagination_class = Pagination

    def get_queryset(self):
        return Game.objects.annotate(
            average_score=Avg('game_reviews__rating')
        )


class UserGamesLibraryView(ListAPIView):
    serializer_class = GamesLibrarySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        try:
            user_games_library = UserGamesLibrary.objects.get(
                user=self.request.user)
            return user_games_library.games.annotate(
                average_score=Avg('game_reviews__rating')
            )
        except UserGamesLibrary.DoesNotExist:
            return Game.objects.none()


class AddToGamesLibraryView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, game_id):
        game = get_object_or_404(Game, id=game_id)
        games_library = request.user.games_library
        games_library.games.add(game)
        return Response({"message": f"{game.name} added to your library."})


class RemoveFromGamesLibraryView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, game_id):
        game = get_object_or_404(Game, id=game_id)
        games_library = request.user.games_library
        if games_library.games.filter(id=game.id).exists():
            games_library.games.remove(game)
            return Response({"message": f"{game.name} removed from your library."}, status=HTTP_200_OK)
        else:
            return Response({"error": f"{game.name} is not in your library."}, status=HTTP_400_BAD_REQUEST)
