from rest_framework import serializers
import base64
from ..models import *


class MovieDirectorsSerializer(serializers.ModelSerializer):

    class Meta:
        model = MovieDirectors
        fields = ['id', 'name']
