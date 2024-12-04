from django.contrib import admin
from .models import *
from django import forms
from django.utils.safestring import mark_safe
from apps.utils import get_image_display_form

# Songs


class SongAdmin(admin.ModelAdmin):
    SongForm = get_image_display_form(Song, forms.ModelForm)
    form = SongForm
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
        reviews = obj.song_reviews.all()
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


# Song reviews


class SongReviewAdmin(admin.ModelAdmin):
    list_display = ('id',)


# Song age rating


class SongESRBAdmin(admin.ModelAdmin):
    list_display = ('rating_name',)
    SongESRBForm = get_image_display_form(SongESRB, forms.ModelForm)
    form = SongESRBForm
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image_as_base64():
            return mark_safe(
                f'<img src="data:image/jpeg;base64,{obj.image_as_base64()}" '
                f'style="max-width: 200px; max-height: 200px;" />'
            )
        return "No image available."

    image_preview.short_description = "Current Image"


# Song Category


class SongCategoryAdmin(admin.ModelAdmin):
    list_display = ('category_name',)
    SongCategoryForm = get_image_display_form(SongCategory, forms.ModelForm)
    form = SongCategoryForm
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image_as_base64():
            return mark_safe(
                f'<img src="data:image/jpeg;base64,{obj.image_as_base64()}" '
                f'style="max-width: 200px; max-height: 200px;" />'
            )
        return "No image available."

    image_preview.short_description = "Current Image"


# Song Authors


class SongAuthorsAdmin(admin.ModelAdmin):
    list_display = ('name',)
    SongAuthorsForm = get_image_display_form(SongAuthors, forms.ModelForm)
    form = SongAuthorsForm
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image_as_base64():
            return mark_safe(
                f'<img src="data:image/jpeg;base64,{obj.image_as_base64()}" '
                f'style="max-width: 200px; max-height: 200px;" />'
            )
        return "No image available."

    image_preview.short_description = "Current Image"


# Song Production


class SongProductionAdmin(admin.ModelAdmin):
    list_display = ('name',)
    SongProductionForm = get_image_display_form(
        SongProduction, forms.ModelForm)
    form = SongProductionForm
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image_as_base64():
            return mark_safe(
                f'<img src="data:image/jpeg;base64,{obj.image_as_base64()}" '
                f'style="max-width: 200px; max-height: 200px;" />'
            )
        return "No image available."

    image_preview.short_description = "Current Image"


# Song Library

class UserSongsLibraryAdmin(admin.ModelAdmin):
    list_display = ('user',)
    search_fields = ('user__username',)


admin.site.register(Song, SongAdmin)
admin.site.register(SongReview, SongReviewAdmin)
admin.site.register(SongCategory, SongCategoryAdmin)
admin.site.register(SongProduction, SongProductionAdmin)
admin.site.register(SongAuthors, SongAuthorsAdmin)
admin.site.register(SongESRB, SongESRBAdmin)
admin.site.register(UserSongsLibrary, UserSongsLibraryAdmin)
