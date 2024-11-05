from django.contrib import admin
from .models import *
from django import forms

class GameAdminForm(forms.ModelForm):
    image_upload = forms.FileField(required=False, label='Upload Image')

    class Meta:
        model = Game
        fields = '__all__'

    def save(self, commit=True):
        instance = super(GameAdminForm, self).save(commit=False)

        if self.cleaned_data.get('image_upload'):
            image_file = self.cleaned_data['image_upload']
            instance.image = image_file.read()

        if commit:
            instance.save()
        return instance

class GameAdmin(admin.ModelAdmin):
    form = GameAdminForm
    list_display = ('name',)


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


admin.site.register(Game, GameAdmin)
admin.site.register(GameReview, GameReviewAdmin)
admin.site.register(GameCategory, GameCategoryAdmin)
admin.site.register(GameBudget, GameBudgetAdmin)
admin.site.register(GamePlatform, GamePlatformAdmin)
admin.site.register(GameESRB, GameESRBAdmin)
