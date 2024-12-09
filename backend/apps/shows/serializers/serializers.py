from rest_framework import serializers
from ..models import *
from datetime import date
import base64
from .actors import *
from .categories import *
from .writers import *
from .esrb import *
from .directors import *
from .production import *
from .reviews import *


class ShowsSerializer(serializers.ModelSerializer):
    released = serializers.SerializerMethodField('get_released')
    image = serializers.SerializerMethodField()
    score = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()

    def get_type(self, obj):
        return 'TV Show'

    def get_released(self, obj):
        return obj.release_date <= date.today()

    def get_image(self, obj):
        if obj.image:
            return base64.b64encode(obj.image).decode('utf-8')
        return None

    def get_score(self, obj):
        return round(obj.score)

    class Meta:
        model = Show
        fields = ['id', 'name', 'slug', 'image', 'score',
                  'release_date', 'recently_added', 'released', 'type']


class ShowsListSerializer(serializers.ModelSerializer):
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
            if hasattr(user, 'shows_library'):
                return user.shows_library.shows.filter(id=obj.id).exists()

        return False

    class Meta:
        model = Show
        fields = ['id', 'name', 'slug', 'image', 'score',
                  'release_date', 'description', 'in_library']


class ShowsLibrarySerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        if obj.image:
            return base64.b64encode(obj.image).decode('utf-8')
        return None

    class Meta:
        model = Show
        fields = ['id', 'name', 'slug', 'image']


class ShowSerializer(serializers.ModelSerializer):
    score = serializers.SerializerMethodField()
    categories = ShowCategoriesSerializer(many=True)
    director = ShowDirectorsSerializer(many=True)
    ESRB = ShowESRBSerializer(many=False)
    writers = ShowWritersSerializer(many=True)
    actors = ShowActorsSerializer(many=True)
    production = ShowProductionSerializer(many=False)
    in_library = serializers.SerializerMethodField()
    has_reviewed = serializers.SerializerMethodField()
    reviews = ShowReviewSerializer(many=True, source='show_reviews')

    class Meta:
        model = Show
        fields = '__all__'

    def get_score(self, obj):
        return round(obj.score)

    def get_in_library(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            user = request.user
            if hasattr(user, 'shows_library'):
                return user.shows_library.shows.filter(id=obj.id).exists()

        return False

    def get_has_reviewed(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            user = request.user
            return ShowReview.objects.filter(show_id=obj.id, author=user).exists()
        return False
