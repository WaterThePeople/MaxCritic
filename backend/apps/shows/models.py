from django.db import models
from django.utils.translation import gettext_lazy as _
from datetime import date
from django.utils.text import slugify
import base64
from django.conf import settings
from ..main.models import CustomUser
from django.db.models.signals import post_save
from django.dispatch import receiver


class ShowESRB(models.Model):
    rating_name = models.CharField(max_length=50)
    image = models.BinaryField(blank=True, null=True)

    def image_as_base64(self):
        if self.image:
            return base64.b64encode(self.image).decode('utf-8')
        return None

    def __str__(self):
        return self.rating_name


class ShowCategory(models.Model):
    category_name = models.CharField(max_length=50)
    image = models.BinaryField(blank=True, null=True)

    def image_as_base64(self):
        if self.image:
            return base64.b64encode(self.image).decode('utf-8')
        return None

    def __str__(self):
        return self.category_name


class ShowActors(models.Model):
    name = models.CharField(max_length=100)
    character = models.CharField(max_length=100)
    image = models.BinaryField(blank=True, null=True)

    def image_as_base64(self):
        if self.image:
            return base64.b64encode(self.image).decode('utf-8')
        return None

    def __str__(self):
        return self.name


class ShowDirectors(models.Model):
    name = models.CharField(max_length=120, unique=True)
    image = models.BinaryField(blank=True, null=True)

    def image_as_base64(self):
        if self.image:
            return base64.b64encode(self.image).decode('utf-8')
        return None

    def __str__(self):
        return self.name


class ShowWriters(models.Model):
    name = models.CharField(max_length=120, unique=True)
    image = models.BinaryField(blank=True, null=True)

    def image_as_base64(self):
        if self.image:
            return base64.b64encode(self.image).decode('utf-8')
        return None

    def __str__(self):
        return self.name


class ShowProduction(models.Model):
    name = models.CharField(max_length=120, unique=True)
    image = models.BinaryField(blank=True, null=True)

    def image_as_base64(self):
        if self.image:
            return base64.b64encode(self.image).decode('utf-8')
        return None

    def __str__(self):
        return self.name


class ShowReview(models.Model):
    rating = models.IntegerField()
    description = models.CharField(max_length=500)
    date = models.DateField(_("Date"), default=date.today)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="show_reviews")
    show = models.ForeignKey(
        'Show', on_delete=models.CASCADE, related_name="show_reviews", null=True, blank=True)

    def __str__(self):
        return str(self.id)

    @property
    def show_name(self):
        return self.show.name if self.show else None

    @property
    def show_id(self):
        return self.show.id if self.show else None

    @property
    def show_slug(self):
        return self.show.slug if self.show else None


class Show(models.Model):
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=150, unique=True, blank=True, null=True)
    youtube_video = models.CharField(max_length=1000, default='')
    description = models.TextField(max_length=500, default='')
    episode_duration = models.TextField(max_length=100, default='')
    episodes = models.IntegerField(default=0)
    actors = models.ManyToManyField(ShowActors)
    categories = models.ManyToManyField(ShowCategory)
    director = models.ManyToManyField(ShowDirectors)
    writers = models.ManyToManyField(ShowWriters)
    production = models.ForeignKey(
        ShowProduction, on_delete=models.CASCADE, null=True)
    ESRB = models.ForeignKey(
        ShowESRB, on_delete=models.CASCADE, null=True)
    score = models.IntegerField(blank=True, default=0)
    recently_added = models.BooleanField(default=False)
    release_date = models.DateField(_("Date"), default=date.today)
    image = models.BinaryField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.name

    @property
    def score(self):
        reviews = self.show_reviews.all()
        if reviews.exists():
            total_score = sum(review.rating for review in reviews)
            return total_score / reviews.count()
        return 0

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self.generate_unique_slug()
        super().save(*args, **kwargs)

    def image_as_base64(self):
        if self.image:
            return base64.b64encode(self.image).decode('utf-8')
        return None

    def generate_unique_slug(self):
        base_slug = slugify(self.name)
        slug = base_slug
        num = 1

        while Show.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{num}"
            num += 1

        return slug


class UserShowsLibrary(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="shows_library"
    )
    shows = models.ManyToManyField(Show, related_name="shows_libraries")

    def __str__(self):
        return f"{self.user.email}'s Library"


@receiver(post_save, sender=CustomUser)
def create_user_library(sender, instance, created, **kwargs):
    if created:
        UserShowsLibrary.objects.create(user=instance)
