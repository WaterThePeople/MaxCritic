from django.contrib import admin
from .models import *


class GameReviewAdmin(admin.ModelAdmin):
    list_display = ('review_id',)


class GameESRBAdmin(admin.ModelAdmin):
    list_display = ('rating_name',)


class GameCategoryAdmin(admin.ModelAdmin):
    list_display = ('category_name',)


class GameBudgetAdmin(admin.ModelAdmin):
    list_display = ('budget_name',)


class GamePlatformAdmin(admin.ModelAdmin):
    list_display = ('platform_name',)


admin.site.register(Game)
admin.site.register(GameReview, GameReviewAdmin)
admin.site.register(GameCategory, GameCategoryAdmin)
admin.site.register(GameBudget, GameBudgetAdmin)
admin.site.register(GamePlatform, GamePlatformAdmin)
admin.site.register(GameESRB, GameESRBAdmin)
