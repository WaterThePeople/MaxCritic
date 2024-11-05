from rest_framework import serializers
from .models import *
from datetime import date
import base64


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
    image = serializers.SerializerMethodField()

    def get_released(self, obj):
        return obj.release_date <= date.today()
    
    def get_image(self, obj):
        if obj.image:
            return base64.b64encode(obj.image).decode('utf-8')
        return None

    class Meta:
        model = Game
        fields = ['id', 'name', 'image', 'score',
                  'release_date', 'recently_added', 'released']
