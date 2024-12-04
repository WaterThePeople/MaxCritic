from rest_framework import serializers
import base64
from ..models import *


class ShowCategoriesSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        if obj.image:
            return base64.b64encode(obj.image).decode('utf-8')
        return None

    class Meta:
        model = ShowCategory
        fields = ['id', 'category_name', 'image']
