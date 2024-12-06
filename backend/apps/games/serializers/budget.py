from rest_framework import serializers
import base64
from ..models import *


class GameBudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameBudget
        fields = ['id', 'budget_name']
