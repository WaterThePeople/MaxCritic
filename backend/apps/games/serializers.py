from rest_framework import serializers
from .models import *
from datetime import date
import base64
from ..main.serializers import UserSerializer


class GameESRBSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        if obj.image:
            return base64.b64encode(obj.image).decode('utf-8')
        return None

    class Meta:
        model = GameESRB
        fields = ['id', 'rating_name', 'image']


class GameCategoriesSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        if obj.image:
            return base64.b64encode(obj.image).decode('utf-8')
        return None

    class Meta:
        model = GameCategory
        fields = ['id', 'category_name', 'image']


class GameBudgetSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        if obj.image:
            return base64.b64encode(obj.image).decode('utf-8')
        return None

    class Meta:
        model = GameBudget
        fields = ['id', 'budget_name', 'image']


class GamePlatformsSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        if obj.image:
            return base64.b64encode(obj.image).decode('utf-8')
        return None

    class Meta:
        model = GamePlatform
        fields = ['id', 'platform_name', 'image']


class GamePublisherSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        if obj.image:
            return base64.b64encode(obj.image).decode('utf-8')
        return None

    class Meta:
        model = GamePublisher
        fields = ['id', 'name', 'image']


class GameDeveloperSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        if obj.image:
            return base64.b64encode(obj.image).decode('utf-8')
        return None

    class Meta:
        model = GameDeveloper
        fields = ['id', 'name', 'image']


class GameReviewSerializer(serializers.ModelSerializer):
    game_id = serializers.IntegerField(write_only=True)
    platform = GamePlatformsSerializer(many=True)
    author = UserSerializer()

    class Meta:
        model = GameReview
        fields = ['game_id', 'rating', 'description',
                  'platform', 'author', 'date', 'id']
        read_only_fields = ['author']


class GameCreateReviewSerializer(serializers.ModelSerializer):
    game_id = serializers.IntegerField(write_only=True)
    author = UserSerializer(read_only=True)

    class Meta:
        model = GameReview
        fields = ['game_id', 'rating', 'description',
                  'platform', 'author', 'date']
        read_only_fields = ['author']

    def create(self, validated_data):
        game_id = validated_data.pop('game_id')
        platform_data = validated_data.pop('platform', [])

        try:
            game = Game.objects.get(id=game_id)
        except Game.DoesNotExist:
            raise serializers.ValidationError(
                "Game with the provided ID does not exist.")

        user = self.context['request'].user

        review = GameReview.objects.create(
            game_name=game.name,
            game_id=game_id,
            author=user,
            date=date.today(),
            **validated_data
        )

        review.platform.set(platform_data)

        game.reviews.add(review)
        game.save()

        return review


class GameEditReviewSerializer(serializers.ModelSerializer):
    game_id = serializers.IntegerField(write_only=True, required=False)
    author = UserSerializer(read_only=True)

    class Meta:
        model = GameReview
        fields = ['game_id', 'rating', 'description',
                  'platform', 'author', 'date']
        read_only_fields = ['author', 'game_id', 'date']

    def update(self, instance, validated_data):
        platform_data = validated_data.pop('platform', None)

        user = self.context['request'].user
        if instance.author != user and not user.is_staff:
            raise serializers.ValidationError(
                "You can only edit your own reviews.")

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if platform_data is not None:
            instance.platform.set(platform_data)

        instance.save()
        return instance


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


class GameSerializer(serializers.ModelSerializer):
    score = serializers.SerializerMethodField()
    categories = GameCategoriesSerializer(many=True)
    platforms = GamePlatformsSerializer(many=True)
    ESRB = GameESRBSerializer(many=False)
    budget = GameBudgetSerializer(many=False)
    publisher = GamePublisherSerializer(many=False)
    developer = GameDeveloperSerializer(many=True)
    reviews = GameReviewSerializer(many=True)
    in_library = serializers.SerializerMethodField()
    has_reviewed = serializers.SerializerMethodField()

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
