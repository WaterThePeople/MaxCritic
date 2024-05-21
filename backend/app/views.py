from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ItemSerializer
from .models import Item

class ItemView(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
