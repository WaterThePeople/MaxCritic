from django.contrib import admin
from .models import *
from django import forms
from django.utils.safestring import mark_safe
from apps.utils import get_image_display_form

# Movies


class MovieAdmin(admin.ModelAdmin):
    MovieForm = get_image_display_form(Movie, forms.ModelForm)
    form = MovieForm
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
        reviews = obj.movie_reviews.all()
        if reviews.exists():
            review_html = "<ul>"
            for review in reviews:
                review_html += (
                    f"<li>"
                    f"<strong>ID:</strong> {review.id}, "
                    f"<strong>Rating:</strong> {review.rating}, "
                    f"<strong>Author:</strong> {review.author.username if review.author else 'Unknown'}"
                    f"</li>"
                )
            review_html += "</ul>"
            return mark_safe(review_html)
        return "No reviews available."

    reviews_list.short_description = "Reviews"


# Movie reviews


class MovieReviewAdmin(admin.ModelAdmin):
    list_display = ('id',)


# Movie age rating


class MovieESRBAdmin(admin.ModelAdmin):
    list_display = ('rating_name',)
    MovieESRBForm = get_image_display_form(MovieESRB, forms.ModelForm)
    form = MovieESRBForm
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image_as_base64():
            return mark_safe(
                f'<img src="data:image/jpeg;base64,{obj.image_as_base64()}" '
                f'style="max-width: 200px; max-height: 200px;" />'
            )
        return "No image available."

    image_preview.short_description = "Current Image"


# Movie Category


class MovieCategoryAdmin(admin.ModelAdmin):
    list_display = ('category_name',)
    MovieCategoryForm = get_image_display_form(MovieCategory, forms.ModelForm)
    form = MovieCategoryForm
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image_as_base64():
            return mark_safe(
                f'<img src="data:image/jpeg;base64,{obj.image_as_base64()}" '
                f'style="max-width: 200px; max-height: 200px;" />'
            )
        return "No image available."

    image_preview.short_description = "Current Image"


# Movie Actors


class MovieActorsAdmin(admin.ModelAdmin):
    list_display = ('name',)
    MovieActorsForm = get_image_display_form(MovieActors, forms.ModelForm)
    form = MovieActorsForm
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image_as_base64():
            return mark_safe(
                f'<img src="data:image/jpeg;base64,{obj.image_as_base64()}" '
                f'style="max-width: 200px; max-height: 200px;" />'
            )
        return "No image available."

    image_preview.short_description = "Current Image"


# Movie Directors


class MovieDirectorsAdmin(admin.ModelAdmin):
    list_display = ('name',)


# Movie Writers


class MovieWritersAdmin(admin.ModelAdmin):
    list_display = ('name',)


# Movie Library

class UserMoviesLibraryAdmin(admin.ModelAdmin):
    list_display = ('user',)
    search_fields = ('user__username',)


admin.site.register(Movie, MovieAdmin)
admin.site.register(MovieReview, MovieReviewAdmin)
admin.site.register(MovieCategory, MovieCategoryAdmin)
admin.site.register(MovieWriters, MovieWritersAdmin)
admin.site.register(MovieDirectors, MovieDirectorsAdmin)
admin.site.register(MovieActors, MovieActorsAdmin)
admin.site.register(MovieESRB, MovieESRBAdmin)
admin.site.register(UserMoviesLibrary, UserMoviesLibraryAdmin)
