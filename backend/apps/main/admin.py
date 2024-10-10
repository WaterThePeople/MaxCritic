from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser
from django.contrib.auth.models import Group
from .models import *


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_filter = ()
    list_display = ('username', 'email', 'is_staff', 'is_superuser')
    fieldsets = (
        (None, {"fields": ('username', "email", "password")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                'username', "email", "password1", "password2",
            )}
         ),
    )
    search_fields = ("username", "email",)
    ordering = ("email",)


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.unregister(Group)
