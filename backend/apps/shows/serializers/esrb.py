from rest_framework import serializers
import base64
from ..models import *


class ShowESRBSerializer(serializers.ModelSerializer):

    class Meta:
        model = ShowESRB
        fields = ['id', 'rating_name']
