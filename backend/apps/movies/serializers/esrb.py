from rest_framework import serializers
import base64
from ..models import *


class MovieESRBSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieESRB
        fields = ['id', 'rating_name']
