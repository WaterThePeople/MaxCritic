from django.contrib import admin
from .forms import CustomUserCreationForm
from .models import CustomUser
from django.contrib.auth.models import Group
from .models import *
from django.utils.safestring import mark_safe
from django import forms


class CustomUserAdminForm(forms.ModelForm):
    image_upload = forms.FileField(required=False, label='Upload Image')
    remove_image = forms.BooleanField(
        required=False, label='Remove Current Image (on save)',
        widget=forms.CheckboxInput(attrs={'class': 'remove-image-checkbox'})
    )

    class Meta:
        model = CustomUser
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        if CustomUser is None:
            raise ValueError(
                "You must provide a CustomUser to use this form.")
        self.Meta.model = CustomUser

        super(CustomUserAdminForm, self).__init__(*args, **kwargs)
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
        instance = super(CustomUserAdminForm, self).save(commit=False)

        if self.cleaned_data.get('remove_image'):
            instance.image = None

        if self.cleaned_data.get('image_upload'):
            image_file = self.cleaned_data['image_upload']
            instance.image = image_file.read()

        if commit:
            instance.save()
        return instance


class UserProfileAdmin(admin.ModelAdmin):
    form = CustomUserAdminForm
    readonly_fields = ('image_preview',)
    add_form = CustomUserCreationForm
    list_display = ('username',)

    fieldsets = (
        (None, {"fields": ('username', 'email', 'is_staff',
         'is_superuser', 'image_upload', 'image_preview', 'remove_image')})
    ),

    # fieldsets = (
    #     (None, {
    #         'fields': ('username', 'email', 'password', 'is_staff', 'is_superuser')
    #     }),
    #     ('Image', {
    #         'fields': ('image_upload',),
    #     }),
    # )

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
