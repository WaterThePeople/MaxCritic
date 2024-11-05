from rest_framework import generics
from .serializers import *

class GameCategoriesView(generics.ListCreateAPIView):
    serializer_class = GameCategorySerializer
    queryset = GameCategory.objects.all()


class GamePlatformsView(generics.ListCreateAPIView):
    serializer_class = GamePlatformSerializer
    queryset = GamePlatform.objects.all()


class GamesView(generics.ListAPIView):
    serializer_class = GamesSerializer
    queryset = Game.objects.all()
