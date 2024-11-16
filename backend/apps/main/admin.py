from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser
from django.contrib.auth.models import Group
from .models import *
from django.utils.safestring import mark_safe
from django import forms
from io import BytesIO
from PIL import Image


class CustomUserAdminForm(forms.ModelForm):
    image_file = forms.ImageField(required=False)

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password',
                  'is_staff', 'is_superuser', 'image_file')

    def save(self, commit=True):
        user = super().save(commit=False)
        image_file = self.cleaned_data.get('image_file')
        if image_file:
            img = Image.open(image_file)
            img_byte_arr = BytesIO()
            img.save(img_byte_arr, format='JPEG')
            img_byte_arr.seek(0)

            user.image = img_byte_arr.read()

        if commit:
            user.save()
        return user


class UserProfileAdmin(admin.ModelAdmin):
    form = CustomUserAdminForm
    readonly_fields = ('image_preview',)
    add_form = CustomUserCreationForm
    list_display = ('username',)

    fieldsets = (
        (None, {"fields": ('username', 'email', 'is_staff',
         'is_superuser', 'image_file', 'image_preview')}),
    )

    def get_fieldsets(self, request, obj=None):
        fieldsets = super().get_fieldsets(request, obj)

        if obj is None:
            fieldsets = list(fieldsets)
            fieldsets[0][1]['fields'] = fieldsets[0][1]['fields'] + \
                ('password', )
        else:
            fieldsets = list(fieldsets)
            fieldsets[0][1]['fields'] = tuple(
                field for field in fieldsets[0][1]['fields'] if field != 'password'
            )

        return fieldsets

    def image_preview(self, obj):
        if obj.image:
            image_base64 = base64.b64encode(obj.image).decode('utf-8')
            return mark_safe(
                f'<img src="data:image/jpeg;base64,{image_base64}" '
                f'style="max-width: 200px; max-height: 200px;" />'
            )
        return "No image available."

    image_preview.short_description = "Current Image"


admin.site.register(CustomUser, UserProfileAdmin)
admin.site.unregister(Group)
