from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager
import base64


class CustomUser(AbstractUser):
    username = models.CharField(max_length=50, unique=True, null=True)
    email = models.EmailField(_("email address"), unique=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = CustomUserManager()

    image = models.BinaryField(blank=True, null=True)

    def image_as_base64(self):
        if self.image:
            return base64.b64encode(self.image).decode('utf-8')
        return None

    def __str__(self):
        return self.email
