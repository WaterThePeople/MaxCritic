from django.contrib import admin
from .models import Item


class ItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')


admin.site.register(Item, ItemAdmin)
