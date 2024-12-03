from rest_framework import serializers
from ..models import *
from ...main.serializers.user import UserProfileSerializer


class MovieReviewSerializer(serializers.ModelSerializer):
    movie = serializers.PrimaryKeyRelatedField(
        queryset=Movie.objects.all(), write_only=True)
    author = UserProfileSerializer()

    class Meta:
        model = MovieReview
        fields = ['movie', 'rating', 'description',
                  'author', 'date', 'id']
        read_only_fields = ['author']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['movie_name'] = instance.movie.name
        representation['movie_slug'] = instance.movie.slug
        return representation


class ProfileMovieReviewSerializer(serializers.ModelSerializer):
    author = UserProfileSerializer()

    class Meta:
        model = MovieReview
        fields = ['movie', 'rating', 'description',
                  'date', 'id', 'author']
        read_only_fields = ['author']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['movie_name'] = instance.movie.name
        representation['movie_slug'] = instance.movie.slug
        return representation


class MovieCreateReviewSerializer(serializers.ModelSerializer):
    id = serializers.PrimaryKeyRelatedField(
        queryset=Movie.objects.all(), write_only=True)
    author = UserProfileSerializer(read_only=True)

    class Meta:
        model = MovieReview
        fields = ['id', 'rating', 'description',
                  'author', 'date']
        read_only_fields = ['author']

    def create(self, validated_data):
        movie = validated_data.pop('id')

        user = self.context['request'].user

        review = MovieReview.objects.create(
            movie=movie,
            author=user,
            date=date.today(),
            **validated_data
        )
        return review


class MovieEditReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieReview
        fields = ['movie_id', 'rating', 'description',
                  'author', 'date']
        read_only_fields = ['author', 'movie_id', 'date']

    def update(self, instance, validated_data):
        user = self.context['request'].user
        if instance.author != user and not user.is_staff:
            raise serializers.ValidationError(
                "You can only edit your own reviews.")
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
