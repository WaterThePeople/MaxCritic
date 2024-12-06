from django.contrib import admin
from .models import *
from django import forms
from django.utils.safestring import mark_safe
from apps.utils import get_image_display_form

# Games


class GameAdmin(admin.ModelAdmin):
    GameForm = get_image_display_form(Game, forms.ModelForm)
    form = GameForm
    list_display = ('name',)
    readonly_fields = ('image_preview', 'reviews_list',)

    def score(self, obj):
        return obj.score

    score.short_description = 'Score'

    def image_preview(self, obj):
        if obj.image_as_base64():
            return mark_safe(
                f'<img src="data:image/jpeg;base64,{obj.image_as_base64()}" '
                f'style="max-width: 200px; max-height: 200px;" />'
            )
        return "No image available."

    image_preview.short_description = "Current Image"

    def reviews_list(self, obj):
        reviews = obj.game_reviews.all()
        if reviews.exists():
            review_html = "<ul>"
            for review in reviews:
                review_html += (
                    f"<li>"
                    f"<strong>Rating:</strong> {review.rating}, "
                    f"<strong>Author:</strong> {review.author if review.author else 'Unknown'}, "
                    f"<strong>Description:</strong> {review.description[:50]}..."
                    f"</li>"
                )
            review_html += "</ul>"
            return mark_safe(review_html)
        return "No reviews available."

    reviews_list.short_description = "Reviews"

# Game reviews


class GameReviewAdmin(admin.ModelAdmin):
    list_display = ('id',)

# Game age rating


class GameESRBAdmin(admin.ModelAdmin):
    list_display = ('rating_name',)


# Game Category


class GameCategoryAdmin(admin.ModelAdmin):
    list_display = ('category_name',)
    GameCategoryForm = get_image_display_form(GameCategory, forms.ModelForm)
    form = GameCategoryForm
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image_as_base64():
            return mark_safe(
                f'<img src="data:image/jpeg;base64,{obj.image_as_base64()}" '
                f'style="max-width: 200px; max-height: 200px;" />'
            )
        return "No image available."

    image_preview.short_description = "Current Image"

# Game Budget


class GameBudgetAdmin(admin.ModelAdmin):
    list_display = ('budget_name',)


# Game platform


class GamePlatformAdmin(admin.ModelAdmin):
    list_display = ('platform_name',)
    GamePlatformForm = get_image_display_form(GamePlatform, forms.ModelForm)
    form = GamePlatformForm
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image_as_base64():
            return mark_safe(
                f'<img src="data:image/jpeg;base64,{obj.image_as_base64()}" '
                f'style="max-width: 200px; max-height: 200px;" />'
            )
        return "No image available."

    image_preview.short_description = "Current Image"


class GameDeveloperAdmin(admin.ModelAdmin):
    list_display = ('name',)
    GameDeveloperForm = get_image_display_form(GameDeveloper, forms.ModelForm)
    form = GameDeveloperForm
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image_as_base64():
            return mark_safe(
                f'<img src="data:image/jpeg;base64,{obj.image_as_base64()}" '
                f'style="max-width: 200px; max-height: 200px;" />'
            )
        return "No image available."

    image_preview.short_description = "Current Image"


class GamePublisherAdmin(admin.ModelAdmin):
    list_display = ('name',)
    GamePublisherForm = get_image_display_form(GamePublisher, forms.ModelForm)
    form = GamePublisherForm
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image_as_base64():
            return mark_safe(
                f'<img src="data:image/jpeg;base64,{obj.image_as_base64()}" '
                f'style="max-width: 200px; max-height: 200px;" />'
            )
        return "No image available."

    image_preview.short_description = "Current Image"


class UserGamesLibraryAdmin(admin.ModelAdmin):
    list_display = ('user',)
    search_fields = ('user__username',)


admin.site.register(Game, GameAdmin)
admin.site.register(GameReview, GameReviewAdmin)
admin.site.register(GameCategory, GameCategoryAdmin)
admin.site.register(GameBudget, GameBudgetAdmin)
admin.site.register(GamePlatform, GamePlatformAdmin)
admin.site.register(GameESRB, GameESRBAdmin)
admin.site.register(GameDeveloper, GameDeveloperAdmin)
admin.site.register(GamePublisher, GamePublisherAdmin)
admin.site.register(UserGamesLibrary, UserGamesLibraryAdmin)
