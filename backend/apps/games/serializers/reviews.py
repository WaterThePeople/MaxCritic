from rest_framework import serializers
from ..models import *
from .platforms import GamePlatformsSerializer
from ...main.serializers.user import UserProfileSerializer


class GameReviewSerializer(serializers.ModelSerializer):
    game_id = serializers.IntegerField(write_only=True)
    platform = GamePlatformsSerializer(many=True)
    author = UserProfileSerializer()

    class Meta:
        model = GameReview
        fields = ['game_id', 'rating', 'description',
                  'platform', 'author', 'date', 'id']
        read_only_fields = ['author']


class ProfileGameReviewSerializer(serializers.ModelSerializer):
    game_id = serializers.IntegerField(write_only=True)
    platform = GamePlatformsSerializer(many=True)

    class Meta:
        model = GameReview
        fields = ['game_id', 'rating', 'description',
                  'platform', 'date', 'id']


class GameCreateReviewSerializer(serializers.ModelSerializer):
    game_id = serializers.IntegerField(write_only=True)
    author = UserProfileSerializer(read_only=True)

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
    author = UserProfileSerializer(read_only=True)

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
