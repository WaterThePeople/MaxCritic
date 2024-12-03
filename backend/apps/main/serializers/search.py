from rest_framework import serializers
from ...games.models import Game
from ...movies.models import Movie
import base64


class GameSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Game
        fields = ['id', 'name', 'slug', 'image', 'type', 'release_date']

    def get_type(self, obj):
        return 'Game'

    def get_image(self, obj):
        if obj.image:
            return base64.b64encode(obj.image).decode('utf-8')
        return None


class MovieSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = ['id', 'name', 'slug', 'image', 'type', 'release_date']

    def get_type(self, obj):
        return 'Movie'

    def get_image(self, obj):
        if obj.image:
            return base64.b64encode(obj.image).decode('utf-8')
        return None
