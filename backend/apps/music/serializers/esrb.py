from rest_framework import serializers
import base64
from ..models import *


class SongESRBSerializer(serializers.ModelSerializer):

    class Meta:
        model = SongESRB
        fields = ['id', 'rating_name']
