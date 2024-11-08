from django.db import models
from django.utils.translation import gettext_lazy as _
from datetime import date
from django.utils.text import slugify


class GameESRB(models.Model):
    rating_name = models.CharField(max_length=50)

    def __str__(self):
        return self.rating_name


class GameCategory(models.Model):
    category_name = models.CharField(max_length=50)

    def __str__(self):
        return self.category_name


class GameBudget(models.Model):
    budget_name = models.CharField(max_length=50)

    def __str__(self):
        return self.budget_name


class GamePlatform(models.Model):
    platform_name = models.CharField(max_length=50)

    def __str__(self):
        return self.platform_name


class GameReview(models.Model):
    game_name = models.CharField(max_length=100)
    game_id = models.IntegerField()
    review_id = models.IntegerField()
    author = models.CharField(max_length=100)
    author_id = models.IntegerField()
    rating = models.IntegerField()
    description = models.CharField(max_length=500)
    date = models.DateField(_("Date"), default=date.today)
    platform = models.ManyToManyField(GamePlatform)

    def __str__(self):
        return str(self.review_id)


class Game(models.Model):
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=150, unique=True, blank=True, null=True)
    youtube_video = models.CharField(max_length=1000, default='')
    description = models.CharField(max_length=500, default='')
    developer = models.CharField(max_length=120, default='')
    publisher = models.CharField(max_length=120, default='')
    ESRB = models.ManyToManyField(GameESRB)
    score = models.IntegerField(blank=True, default=0)
    reviews = models.ManyToManyField(GameReview, blank=True)
    recently_added = models.BooleanField(default=False)
    release_date = models.DateField(_("Date"), default=date.today)
    categories = models.ManyToManyField(GameCategory)
    budget = models.ManyToManyField(GameBudget)
    platforms = models.ManyToManyField(GamePlatform)
    image = models.BinaryField(blank=True, null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self.generate_unique_slug()
        super().save(*args, **kwargs)

    def generate_unique_slug(self):
        base_slug = slugify(self.name)
        slug = base_slug
        num = 1

        while Game.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{num}"
            num += 1

        return slug
