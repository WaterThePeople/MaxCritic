from rest_framework import serializers
from .models import *
from datetime import date
import base64


class GameESRBSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameESRB
        fields = ['id', 'rating_name']


class GameCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameCategory
        fields = ['id', 'category_name']


class GameBudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameBudget
        fields = ['id', 'budget_name']


class GamePlatformsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GamePlatform
        fields = ['id', 'platform_name']


class GameReviewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameReview
        fields = '__all__'


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
        fields = ['id', 'name', 'slug', 'image', 'score',
                  'release_date', 'recently_added', 'released']


class GameSerializer(serializers.ModelSerializer):
    categories = GameCategoriesSerializer(many=True)
    platforms = GamePlatformsSerializer(many=True)
    ESRB = GameESRBSerializer(many=True)
    budget = GameBudgetSerializer(many=True)
    reviews = GameReviewsSerializer(many=True)

    class Meta:
        model = Game
        fields = '__all__'
