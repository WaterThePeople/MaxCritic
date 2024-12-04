from django.contrib import admin
from .models import *
from django import forms
from django.utils.safestring import mark_safe
from apps.utils import get_image_display_form

# Shows


class ShowAdmin(admin.ModelAdmin):
    ShowForm = get_image_display_form(Show, forms.ModelForm)
    form = ShowForm
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
        reviews = obj.show_reviews.all()
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


# Show reviews


class ShowReviewAdmin(admin.ModelAdmin):
    list_display = ('id',)


# Show age rating


class ShowESRBAdmin(admin.ModelAdmin):
    list_display = ('rating_name',)
    ShowESRBForm = get_image_display_form(ShowESRB, forms.ModelForm)
    form = ShowESRBForm
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image_as_base64():
            return mark_safe(
                f'<img src="data:image/jpeg;base64,{obj.image_as_base64()}" '
                f'style="max-width: 200px; max-height: 200px;" />'
            )
        return "No image available."

    image_preview.short_description = "Current Image"


# Show Category


class ShowCategoryAdmin(admin.ModelAdmin):
    list_display = ('category_name',)
    ShowCategoryForm = get_image_display_form(ShowCategory, forms.ModelForm)
    form = ShowCategoryForm
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image_as_base64():
            return mark_safe(
                f'<img src="data:image/jpeg;base64,{obj.image_as_base64()}" '
                f'style="max-width: 200px; max-height: 200px;" />'
            )
        return "No image available."

    image_preview.short_description = "Current Image"


# Show Actors


class ShowActorsAdmin(admin.ModelAdmin):
    list_display = ('name',)
    ShowActorsForm = get_image_display_form(ShowActors, forms.ModelForm)
    form = ShowActorsForm
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image_as_base64():
            return mark_safe(
                f'<img src="data:image/jpeg;base64,{obj.image_as_base64()}" '
                f'style="max-width: 200px; max-height: 200px;" />'
            )
        return "No image available."

    image_preview.short_description = "Current Image"


# Show Production


class ShowProductionAdmin(admin.ModelAdmin):
    list_display = ('name',)
    ShowProductionForm = get_image_display_form(
        ShowProduction, forms.ModelForm)
    form = ShowProductionForm
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image_as_base64():
            return mark_safe(
                f'<img src="data:image/jpeg;base64,{obj.image_as_base64()}" '
                f'style="max-width: 200px; max-height: 200px;" />'
            )
        return "No image available."

    image_preview.short_description = "Current Image"


# Show Directors


class ShowDirectorsAdmin(admin.ModelAdmin):
    list_display = ('name',)
    ShowDirectorsForm = get_image_display_form(
        ShowDirectors, forms.ModelForm)
    form = ShowDirectorsForm
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image_as_base64():
            return mark_safe(
                f'<img src="data:image/jpeg;base64,{obj.image_as_base64()}" '
                f'style="max-width: 200px; max-height: 200px;" />'
            )
        return "No image available."

    image_preview.short_description = "Current Image"


# Show Writers


class ShowWritersAdmin(admin.ModelAdmin):
    list_display = ('name',)
    ShowWritersForm = get_image_display_form(
        ShowWriters, forms.ModelForm)
    form = ShowWritersForm
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image_as_base64():
            return mark_safe(
                f'<img src="data:image/jpeg;base64,{obj.image_as_base64()}" '
                f'style="max-width: 200px; max-height: 200px;" />'
            )
        return "No image available."

    image_preview.short_description = "Current Image"


# Show Library

class UserShowsLibraryAdmin(admin.ModelAdmin):
    list_display = ('user',)
    search_fields = ('user__username',)


admin.site.register(Show, ShowAdmin)
admin.site.register(ShowReview, ShowReviewAdmin)
admin.site.register(ShowCategory, ShowCategoryAdmin)
admin.site.register(ShowProduction, ShowProductionAdmin)
admin.site.register(ShowWriters, ShowWritersAdmin)
admin.site.register(ShowDirectors, ShowDirectorsAdmin)
admin.site.register(ShowActors, ShowActorsAdmin)
admin.site.register(ShowESRB, ShowESRBAdmin)
admin.site.register(UserShowsLibrary, UserShowsLibraryAdmin)
