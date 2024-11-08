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
    ESRB = GameESRBSerializer(many=True)
    budget = GameBudgetSerializer(many=True)
    reviews = GameReviewSerializer(many=True)

    class Meta:
        model = Game
        fields = '__all__'
