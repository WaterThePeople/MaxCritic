from ..models import CustomUser
from ...games.serializers.reviews import ProfileGameReviewSerializer
from ...movies.serializers.reviews import ProfileMovieReviewSerializer
from ...shows.serializers.reviews import ProfileShowReviewSerializer
from rest_framework import serializers


class UserProfileSerializer(serializers.ModelSerializer):
    game_reviews = ProfileGameReviewSerializer(many=True, read_only=True)
    movie_reviews = ProfileMovieReviewSerializer(many=True, read_only=True)
    show_reviews = ProfileShowReviewSerializer(many=True, read_only=True)
    image = 'image_as_base64'

    class Meta:
        model = CustomUser
        fields = ['username',
                  'image', 'game_reviews', 'movie_reviews', 'show_reviews']
