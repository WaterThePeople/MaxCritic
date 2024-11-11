from django.contrib import admin
from .models import *
from django import forms
from django.utils.safestring import mark_safe

# Image display function


def get_image_display_form(model_class, base_form_class):
    class ImageDisplayForm(base_form_class):
        image_upload = forms.FileField(required=False, label='Upload Image')

        class Meta:
            model = model_class
            fields = '__all__'

        def __init__(self, *args, **kwargs):
            if model_class is None:
                raise ValueError(
                    "You must provide a model_class to use this form.")
            self.Meta.model = model_class

            super(ImageDisplayForm, self).__init__(*args, **kwargs)
            if self.instance and self.instance.image_as_base64():
                self.fields['image_preview'] = forms.CharField(
                    required=False,
                    label='Current Image',
                    widget=forms.TextInput(attrs={
                        'readonly': 'readonly',
                        'style': 'display: none;',
                    })
                )
                self.image_preview_html = mark_safe(
                    f'<img src="data:image/jpeg;base64,{self.instance.image_as_base64()}" '
                    f'style="max-width: 200px; max-height: 200px;" />'
                )
            else:
                self.image_preview_html = "No image available."

        def save(self, commit=True):
            instance = super(ImageDisplayForm, self).save(commit=False)

            if self.cleaned_data.get('image_upload'):
                image_file = self.cleaned_data['image_upload']
                instance.image = image_file.read()

            if commit:
                instance.save()
            return instance

    return ImageDisplayForm


# Games


class GameAdmin(admin.ModelAdmin):
    GameForm = get_image_display_form(Game, forms.ModelForm)
    form = GameForm
    list_display = ('name',)
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image_as_base64():
            return mark_safe(
                f'<img src="data:image/jpeg;base64,{obj.image_as_base64()}" '
                f'style="max-width: 200px; max-height: 200px;" />'
            )
        return "No image available."

    image_preview.short_description = "Current Image"

# Game reviews


class GameReviewAdmin(admin.ModelAdmin):
    list_display = ('review_id',)

# Game age rating


class GameESRBAdmin(admin.ModelAdmin):
    list_display = ('rating_name',)
    GameESRBForm = get_image_display_form(GameESRB, forms.ModelForm)
    form = GameESRBForm
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image_as_base64():
            return mark_safe(
                f'<img src="data:image/jpeg;base64,{obj.image_as_base64()}" '
                f'style="max-width: 200px; max-height: 200px;" />'
            )
        return "No image available."

    image_preview.short_description = "Current Image"

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
    GameBudgetForm = get_image_display_form(GameBudget, forms.ModelForm)
    form = GameBudgetForm
    list_display = ('budget_name',)
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image_as_base64():
            return mark_safe(
                f'<img src="data:image/jpeg;base64,{obj.image_as_base64()}" '
                f'style="max-width: 200px; max-height: 200px;" />'
            )
        return "No image available."

    image_preview.short_description = "Current Image"

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


admin.site.register(Game, GameAdmin)
admin.site.register(GameReview, GameReviewAdmin)
admin.site.register(GameCategory, GameCategoryAdmin)
admin.site.register(GameBudget, GameBudgetAdmin)
admin.site.register(GamePlatform, GamePlatformAdmin)
admin.site.register(GameESRB, GameESRBAdmin)
admin.site.register(GameDeveloper, GameDeveloperAdmin)
admin.site.register(GamePublisher, GamePublisherAdmin)
