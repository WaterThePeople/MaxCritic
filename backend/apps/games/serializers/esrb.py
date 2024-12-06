from rest_framework import serializers
import base64
from ..models import *


class GameESRBSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameESRB
        fields = ['id', 'rating_name']
