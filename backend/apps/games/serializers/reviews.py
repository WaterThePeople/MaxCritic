from rest_framework import serializers
from ..models import *
from .platforms import GamePlatformsSerializer
from ...main.serializers.user import UserProfileSerializer


class GameReviewSerializer(serializers.ModelSerializer):
    game = serializers.PrimaryKeyRelatedField(
        queryset=Game.objects.all(), write_only=True)
    platform = GamePlatformsSerializer(many=True)
    author = UserProfileSerializer()

    class Meta:
        model = GameReview
        fields = ['game', 'rating', 'description',
                  'platform', 'author', 'date', 'id']
        read_only_fields = ['author']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['game_name'] = instance.game.name
        representation['game_slug'] = instance.game.slug
        return representation


class ProfileGameReviewSerializer(serializers.ModelSerializer):
    platform = GamePlatformsSerializer(many=True)
    author = UserProfileSerializer()

    class Meta:
        model = GameReview
        fields = ['game', 'rating', 'description',
                  'platform', 'date', 'id', 'author']
        read_only_fields = ['author']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['game_name'] = instance.game.name
        representation['game_slug'] = instance.game.slug
        game_platforms = instance.game.platforms.all()
        representation['game_platforms'] = GamePlatformsSerializer(
            game_platforms, many=True).data
        return representation


class GameCreateReviewSerializer(serializers.ModelSerializer):
    game = serializers.PrimaryKeyRelatedField(
        queryset=Game.objects.all(), write_only=True)
    author = UserProfileSerializer(read_only=True)

    class Meta:
        model = GameReview
        fields = ['game', 'rating', 'description',
                  'platform', 'author', 'date']
        read_only_fields = ['author']

    def create(self, validated_data):
        game = validated_data.pop('game')
        platform_data = validated_data.pop('platform', [])

        user = self.context['request'].user

        review = GameReview.objects.create(
            game=game,
            author=user,
            date=date.today(),
            **validated_data
        )

        review.platform.set(platform_data)
        return review


class GameEditReviewSerializer(serializers.ModelSerializer):
    platform = serializers.PrimaryKeyRelatedField(queryset=GamePlatform.objects.all(
    ), many=True)

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
