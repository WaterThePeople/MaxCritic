from django.db import models
from django.utils.translation import gettext_lazy as _
from datetime import date
from django.utils.text import slugify
import base64
from django.conf import settings
from ..main.models import CustomUser
from django.db.models.signals import post_save
from django.dispatch import receiver


class GameESRB(models.Model):
    rating_name = models.CharField(max_length=50)
    image = models.BinaryField(blank=True, null=True)

    def image_as_base64(self):
        if self.image:
            return base64.b64encode(self.image).decode('utf-8')
        return None

    def __str__(self):
        return self.rating_name


class GameCategory(models.Model):
    category_name = models.CharField(max_length=50)
    image = models.BinaryField(blank=True, null=True)

    def image_as_base64(self):
        if self.image:
            return base64.b64encode(self.image).decode('utf-8')
        return None

    def __str__(self):
        return self.category_name


class GameBudget(models.Model):
    budget_name = models.CharField(max_length=50)
    image = models.BinaryField(blank=True, null=True)

    def image_as_base64(self):
        if self.image:
            return base64.b64encode(self.image).decode('utf-8')
        return None

    def __str__(self):
        return self.budget_name


class GamePlatform(models.Model):
    platform_name = models.CharField(max_length=50)
    image = models.BinaryField(blank=True, null=True)

    def image_as_base64(self):
        if self.image:
            return base64.b64encode(self.image).decode('utf-8')
        return None

    def __str__(self):
        return self.platform_name


class GameDeveloper(models.Model):
    name = models.CharField(max_length=120, unique=True)
    image = models.BinaryField(blank=True, null=True)

    def image_as_base64(self):
        if self.image:
            return base64.b64encode(self.image).decode('utf-8')
        return None

    def __str__(self):
        return self.name


class GamePublisher(models.Model):
    name = models.CharField(max_length=120, unique=True)
    image = models.BinaryField(blank=True, null=True)

    def image_as_base64(self):
        if self.image:
            return base64.b64encode(self.image).decode('utf-8')
        return None

    def __str__(self):
        return self.name


class GameReview(models.Model):
    rating = models.IntegerField()
    description = models.CharField(max_length=500)
    date = models.DateField(_("Date"), default=date.today)
    platform = models.ManyToManyField(GamePlatform)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="game_reviews")
    game = models.ForeignKey(
        'Game', on_delete=models.CASCADE, related_name="game_reviews", null=True, blank=True)

    def __str__(self):
        return str(self.id)

    @property
    def game_name(self):
        return self.game.name if self.game else None

    @property
    def game_id(self):
        return self.game.id if self.game else None

    @property
    def game_slug(self):
        return self.game.slug if self.game else None


class Game(models.Model):
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=150, unique=True, blank=True, null=True)
    youtube_video = models.CharField(max_length=1000, default='')
    description = models.TextField(max_length=500, default='')
    developer = models.ManyToManyField(GameDeveloper)
    publisher = models.ForeignKey(
        GamePublisher, on_delete=models.CASCADE, null=True)
    ESRB = models.ForeignKey(
        GameESRB, on_delete=models.CASCADE, null=True)
    score = models.IntegerField(blank=True, default=0)
    recently_added = models.BooleanField(default=False)
    release_date = models.DateField(_("Date"), default=date.today)
    categories = models.ManyToManyField(GameCategory)
    budget = models.ForeignKey(
        GameBudget, on_delete=models.CASCADE, null=True)
    platforms = models.ManyToManyField(GamePlatform)
    image = models.BinaryField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.name

    @property
    def score(self):
        reviews = self.game_reviews.all()
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

        while Game.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{num}"
            num += 1

        return slug


class UserGamesLibrary(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="games_library"
    )
    games = models.ManyToManyField(Game, related_name="games_libraries")

    def __str__(self):
        return f"{self.user.email}'s Library"


@receiver(post_save, sender=CustomUser)
def create_user_library(sender, instance, created, **kwargs):
    if created:
        UserGamesLibrary.objects.create(user=instance)
