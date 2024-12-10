from rest_framework import serializers
import base64
from ..models import *


class ShowWritersSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShowWriters
        fields = ['id', 'name']
