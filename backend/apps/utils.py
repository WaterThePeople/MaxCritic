from django import forms
from django.utils.safestring import mark_safe


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
