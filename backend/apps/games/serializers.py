from rest_framework import serializers
from .models import *
from datetime import date


class GameCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GameCategory
        fields = ['id', 'category_name']


class GamePlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = GamePlatform
        fields = ['id', 'platform_name']


class GamesSerializer(serializers.ModelSerializer):
    released = serializers.SerializerMethodField('get_released')

    def get_released(self, obj):
        return obj.release_date <= date.today()

    class Meta:
        model = Game
        fields = ['id', 'name', 'image', 'score',
                  'release_date', 'recently_added', 'released']
