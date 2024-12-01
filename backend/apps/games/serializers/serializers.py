from rest_framework import serializers
from ..models import *
from datetime import date
import base64
from .budget import *
from .categories import *
from .developer import *
from .esrb import *
from .platforms import *
from .publisher import *
from .reviews import *


class GamesSerializer(serializers.ModelSerializer):
    released = serializers.SerializerMethodField('get_released')
    image = serializers.SerializerMethodField()
    score = serializers.SerializerMethodField()

    def get_released(self, obj):
        return obj.release_date <= date.today()

    def get_image(self, obj):
        if obj.image:
            return base64.b64encode(obj.image).decode('utf-8')
        return None

    def get_score(self, obj):
        return round(obj.score)

    class Meta:
        model = Game
        fields = ['id', 'name', 'slug', 'image', 'score',
                  'release_date', 'recently_added', 'released']


class GamesListSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    score = serializers.SerializerMethodField()
    in_library = serializers.SerializerMethodField()

    def get_image(self, obj):
        if obj.image:
            return base64.b64encode(obj.image).decode('utf-8')
        return None

    def get_score(self, obj):
        return round(obj.score)

    def get_in_library(self, obj):
        request = self.context.get('request')

        if not request or not request.user.is_authenticated:
            return False

        user = request.user
        if hasattr(user, 'library'):
            return user.library.games.filter(id=obj.id).exists()

    class Meta:
        model = Game
        fields = ['id', 'name', 'slug', 'image', 'score',
                  'release_date', 'description', 'in_library']


class GamesLibrarySerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        if obj.image:
            return base64.b64encode(obj.image).decode('utf-8')
        return None

    class Meta:
        model = Game
        fields = ['id', 'name', 'slug', 'image']


class GameSerializer(serializers.ModelSerializer):
    score = serializers.SerializerMethodField()
    categories = GameCategoriesSerializer(many=True)
    platforms = GamePlatformsSerializer(many=True)
    ESRB = GameESRBSerializer(many=False)
    budget = GameBudgetSerializer(many=False)
    publisher = GamePublisherSerializer(many=False)
    developer = GameDeveloperSerializer(many=True)
    in_library = serializers.SerializerMethodField()
    has_reviewed = serializers.SerializerMethodField()
    reviews = GameReviewSerializer(many=True, source='game_reviews')

    class Meta:
        model = Game
        fields = '__all__'

    def get_score(self, obj):
        return round(obj.score)

    def get_in_library(self, obj):
        request = self.context.get('request')

        if not request or not request.user.is_authenticated:
            return False

        user = request.user

        if hasattr(user, 'library'):
            return user.library.games.filter(id=obj.id).exists()

        return False

    def get_has_reviewed(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return False

        user = request.user
        return GameReview.objects.filter(game_id=obj.id, author=user).exists()
