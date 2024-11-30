from ..models import CustomUser
from ...games.serializers.reviews import ProfileGameReviewSerializer
from rest_framework import serializers


class UserProfileSerializer(serializers.ModelSerializer):
    game_reviews = ProfileGameReviewSerializer(many=True, read_only=True)
    image = 'image_as_base64'

    class Meta:
        model = CustomUser
        fields = ['username',
                  'image', 'game_reviews']
