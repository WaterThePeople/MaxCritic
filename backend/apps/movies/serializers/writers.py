from rest_framework import serializers
import base64
from ..models import *


class MovieWritersSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieWriters
        fields = ['id', 'name']
