from rest_framework import serializers
from ..models import *
from ...main.serializers.user import UserProfileSerializer


class ShowReviewSerializer(serializers.ModelSerializer):
    show = serializers.PrimaryKeyRelatedField(
        queryset=Show.objects.all(), write_only=True)
    author = UserProfileSerializer()

    class Meta:
        model = ShowReview
        fields = ['show', 'rating', 'description',
                  'author', 'date', 'id']
        read_only_fields = ['author']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['show_name'] = instance.show.name
        representation['show_slug'] = instance.show.slug
        return representation


class ProfileShowReviewSerializer(serializers.ModelSerializer):
    author = UserProfileSerializer()

    class Meta:
        model = ShowReview
        fields = ['show', 'rating', 'description',
                  'date', 'id', 'author']
        read_only_fields = ['author']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['show_name'] = instance.show.name
        representation['show_slug'] = instance.show.slug
        return representation


class ShowCreateReviewSerializer(serializers.ModelSerializer):
    id = serializers.PrimaryKeyRelatedField(
        queryset=Show.objects.all(), write_only=True)
    author = UserProfileSerializer(read_only=True)

    class Meta:
        model = ShowReview
        fields = ['id', 'rating', 'description',
                  'author', 'date']
        read_only_fields = ['author']

    def create(self, validated_data):
        show = validated_data.pop('id')

        user = self.context['request'].user

        review = ShowReview.objects.create(
            show=show,
            author=user,
            date=date.today(),
            **validated_data
        )
        return review


class ShowEditReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShowReview
        fields = ['show_id', 'rating', 'description',
                  'author', 'date']
        read_only_fields = ['author', 'show_id', 'date']

    def update(self, instance, validated_data):
        user = self.context['request'].user
        if instance.author != user and not user.is_staff:
            raise serializers.ValidationError(
                "You can only edit your own reviews.")
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
