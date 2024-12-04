from rest_framework import serializers
from ..models import *
from datetime import date
import base64
from .authors import *
from .categories import *
from .esrb import *
from .reviews import *


class SongsSerializer(serializers.ModelSerializer):
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
        model = Song
        fields = ['id', 'name', 'slug', 'image', 'score',
                  'release_date', 'recently_added', 'released']


class SongsListSerializer(serializers.ModelSerializer):
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

        if request and request.user.is_authenticated:
            user = request.user
            if hasattr(user, 'songs_library'):
                return user.songs_library.songs.filter(id=obj.id).exists()

        return False

    class Meta:
        model = Song
        fields = ['id', 'name', 'slug', 'image', 'score',
                  'release_date', 'description', 'in_library']


class SongsLibrarySerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        if obj.image:
            return base64.b64encode(obj.image).decode('utf-8')
        return None

    class Meta:
        model = Song
        fields = ['id', 'name', 'slug', 'image']


class SongSerializer(serializers.ModelSerializer):
    score = serializers.SerializerMethodField()
    categories = SongCategoriesSerializer(many=True)
    ESRB = SongESRBSerializer(many=False)
    authors = SongAuthorsSerializer(many=True)
    in_library = serializers.SerializerMethodField()
    has_reviewed = serializers.SerializerMethodField()
    reviews = SongReviewSerializer(many=True, source='song_reviews')

    class Meta:
        model = Song
        fields = '__all__'

    def get_score(self, obj):
        return round(obj.score)

    def get_in_library(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            user = request.user
            if hasattr(user, 'songs_library'):
                return user.songs_library.songs.filter(id=obj.id).exists()

        return False

    def get_has_reviewed(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            user = request.user
            return SongReview.objects.filter(song_id=obj.id, author=user).exists()
        return False
