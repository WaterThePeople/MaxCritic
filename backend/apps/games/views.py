from rest_framework import generics
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView


class GameCategoriesView(generics.ListCreateAPIView):
    serializer_class = GameCategoriesSerializer
    queryset = GameCategory.objects.all()


class GamePlatformsView(generics.ListCreateAPIView):
    serializer_class = GamePlatformsSerializer
    queryset = GamePlatform.objects.all()


class GamesView(generics.ListAPIView):
    serializer_class = GamesSerializer
    queryset = Game.objects.all()


class GameView(APIView):
    def get(self, request, slug):
        try:
            item = Game.objects.get(slug=slug)
            serializer = GameSerializer(item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Game.DoesNotExist:
            return Response({"error": "Game not found"}, status=status.HTTP_404_NOT_FOUND)
