from rest_framework import serializers
from .models import *
from datetime import date
import base64


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

    class Meta:
        model = GameReview
        fields = ['game_id', 'rating', 'description', 'platform']

    def create(self, validated_data):
        game_id = validated_data.pop('game_id')
        platform_data = validated_data.pop('platform', [])

        try:
            game = Game.objects.get(id=game_id)
        except Game.DoesNotExist:
            raise serializers.ValidationError(
                "Game with the provided ID does not exist.")

        user = self.context['request'].user

        try:
            latest_review = GameReview.objects.latest('id')
            review_id = latest_review.id + 1
        except GameReview.DoesNotExist:
            review_id = 1

        review = GameReview.objects.create(
            game_name=game.name,
            game_id=game_id,
            review_id=review_id,
            author=user.username,
            author_id=user.id,
            date=date.today(),
            **validated_data
        )

        review.platform.set(platform_data)

        game.reviews.add(review)
        game.save()

        return review


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
    ESRB = GameESRBSerializer(many=False)
    budget = GameBudgetSerializer(many=False)
    publisher = GamePublisherSerializer(many=False)
    developer = GameDeveloperSerializer(many=False)
    reviews = GameReviewSerializer(many=True)

    class Meta:
        model = Game
        fields = '__all__'
