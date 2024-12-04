from rest_framework import serializers
from ..models import *
from ...main.serializers.user import UserProfileSerializer


class SongReviewSerializer(serializers.ModelSerializer):
    song = serializers.PrimaryKeyRelatedField(
        queryset=Song.objects.all(), write_only=True)
    author = UserProfileSerializer()

    class Meta:
        model = SongReview
        fields = ['song', 'rating', 'description',
                  'author', 'date', 'id']
        read_only_fields = ['author']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['song_name'] = instance.song.name
        representation['song_slug'] = instance.song.slug
        return representation


class ProfileSongReviewSerializer(serializers.ModelSerializer):
    author = UserProfileSerializer()

    class Meta:
        model = SongReview
        fields = ['song', 'rating', 'description',
                  'date', 'id', 'author']
        read_only_fields = ['author']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['song_name'] = instance.song.name
        representation['song_slug'] = instance.song.slug
        return representation


class SongCreateReviewSerializer(serializers.ModelSerializer):
    id = serializers.PrimaryKeyRelatedField(
        queryset=Song.objects.all(), write_only=True)
    author = UserProfileSerializer(read_only=True)

    class Meta:
        model = SongReview
        fields = ['id', 'rating', 'description',
                  'author', 'date']
        read_only_fields = ['author']

    def create(self, validated_data):
        song = validated_data.pop('id')

        user = self.context['request'].user

        review = SongReview.objects.create(
            song=song,
            author=user,
            date=date.today(),
            **validated_data
        )
        return review


class SongEditReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = SongReview
        fields = ['song_id', 'rating', 'description',
                  'author', 'date']
        read_only_fields = ['author', 'song_id', 'date']

    def update(self, instance, validated_data):
        user = self.context['request'].user
        if instance.author != user and not user.is_staff:
            raise serializers.ValidationError(
                "You can only edit your own reviews.")
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
