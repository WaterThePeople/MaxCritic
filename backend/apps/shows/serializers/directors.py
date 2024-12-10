from rest_framework import serializers
import base64
from ..models import *


class ShowDirectorsSerializer(serializers.ModelSerializer):

    class Meta:
        model = ShowDirectors
        fields = ['id', 'name']
