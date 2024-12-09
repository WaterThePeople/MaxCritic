from rest_framework import serializers
from ..models import *
from datetime import date
import base64
from .actors import *
from .categories import *
from .writers import *
from .esrb import *
from .directors import *
from .reviews import *


class MoviesSerializer(serializers.ModelSerializer):
    released = serializers.SerializerMethodField('get_released')
    image = serializers.SerializerMethodField()
    score = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()

    def get_type(self, obj):
        return 'Movie'

    def get_released(self, obj):
        return obj.release_date <= date.today()

    def get_image(self, obj):
        if obj.image:
            return base64.b64encode(obj.image).decode('utf-8')
        return None

    def get_score(self, obj):
        return round(obj.score)

    class Meta:
        model = Movie
        fields = ['id', 'name', 'slug', 'image', 'score',
                  'release_date', 'recently_added', 'released', 'type']


class MoviesListSerializer(serializers.ModelSerializer):
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
            if hasattr(user, 'movies_library'):
                return user.movies_library.movies.filter(id=obj.id).exists()

        return False

    class Meta:
        model = Movie
        fields = ['id', 'name', 'slug', 'image', 'score',
                  'release_date', 'description', 'in_library']


class MoviesLibrarySerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        if obj.image:
            return base64.b64encode(obj.image).decode('utf-8')
        return None

    class Meta:
        model = Movie
        fields = ['id', 'name', 'slug', 'image']


class MovieSerializer(serializers.ModelSerializer):
    score = serializers.SerializerMethodField()
    categories = MovieCategoriesSerializer(many=True)
    director = MovieDirectorsSerializer(many=True)
    ESRB = MovieESRBSerializer(many=False)
    writers = MovieWritersSerializer(many=True)
    actors = MovieActorsSerializer(many=True)
    in_library = serializers.SerializerMethodField()
    has_reviewed = serializers.SerializerMethodField()
    reviews = MovieReviewSerializer(many=True, source='movie_reviews')

    class Meta:
        model = Movie
        fields = '__all__'

    def get_score(self, obj):
        return round(obj.score)

    def get_in_library(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            user = request.user
            if hasattr(user, 'movies_library'):
                return user.movies_library.movies.filter(id=obj.id).exists()

        return False

    def get_has_reviewed(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            user = request.user
            return MovieReview.objects.filter(movie_id=obj.id, author=user).exists()
        return False
