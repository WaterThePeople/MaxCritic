from django.db import models
from django.utils.translation import gettext_lazy as _
from datetime import date
from django.utils.text import slugify
import base64
from django.conf import settings
from ..main.models import CustomUser
from django.db.models.signals import post_save
from django.dispatch import receiver


class MovieESRB(models.Model):
    rating_name = models.CharField(max_length=50)
    image = models.BinaryField(blank=True, null=True)

    def image_as_base64(self):
        if self.image:
            return base64.b64encode(self.image).decode('utf-8')
        return None

    def __str__(self):
        return self.rating_name


class MovieCategory(models.Model):
    category_name = models.CharField(max_length=50)
    image = models.BinaryField(blank=True, null=True)

    def image_as_base64(self):
        if self.image:
            return base64.b64encode(self.image).decode('utf-8')
        return None

    def __str__(self):
        return self.category_name


class MovieActors(models.Model):
    name = models.CharField(max_length=100)
    character = models.CharField(max_length=100)
    image = models.BinaryField(blank=True, null=True)

    def image_as_base64(self):
        if self.image:
            return base64.b64encode(self.image).decode('utf-8')
        return None

    def __str__(self):
        return self.name


class MovieDirectors(models.Model):
    name = models.CharField(max_length=120, unique=True)
    image = models.BinaryField(blank=True, null=True)

    def image_as_base64(self):
        if self.image:
            return base64.b64encode(self.image).decode('utf-8')
        return None

    def __str__(self):
        return self.name


class MovieWriters(models.Model):
    name = models.CharField(max_length=120, unique=True)
    image = models.BinaryField(blank=True, null=True)

    def image_as_base64(self):
        if self.image:
            return base64.b64encode(self.image).decode('utf-8')
        return None

    def __str__(self):
        return self.name


class MovieProduction(models.Model):
    name = models.CharField(max_length=120, unique=True)
    image = models.BinaryField(blank=True, null=True)

    def image_as_base64(self):
        if self.image:
            return base64.b64encode(self.image).decode('utf-8')
        return None

    def __str__(self):
        return self.name


class MovieReview(models.Model):
    rating = models.IntegerField()
    description = models.CharField(max_length=500)
    date = models.DateField(_("Date"), default=date.today)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="movie_reviews")
    movie = models.ForeignKey(
        'Movie', on_delete=models.CASCADE, related_name="movie_reviews", null=True, blank=True)

    def __str__(self):
        return str(self.id)

    @property
    def movie_name(self):
        return self.movie.name if self.movie else None

    @property
    def movie_id(self):
        return self.movie.id if self.movie else None

    @property
    def movie_slug(self):
        return self.movie.slug if self.movie else None


class Movie(models.Model):
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=150, unique=True, blank=True, null=True)
    youtube_video = models.CharField(max_length=1000, default='')
    description = models.TextField(max_length=500, default='')
    duration = models.TextField(max_length=100, default='')
    actors = models.ManyToManyField(MovieActors)
    categories = models.ManyToManyField(MovieCategory)
    director = models.ManyToManyField(MovieDirectors)
    writers = models.ManyToManyField(MovieWriters)
    production = models.ForeignKey(
        MovieProduction, on_delete=models.CASCADE, null=True)
    ESRB = models.ForeignKey(
        MovieESRB, on_delete=models.CASCADE, null=True)
    score = models.IntegerField(blank=True, default=0)
    recently_added = models.BooleanField(default=False)
    release_date = models.DateField(_("Date"), default=date.today)
    image = models.BinaryField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.name

    @property
    def score(self):
        reviews = self.movie_reviews.all()
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

        while Movie.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{num}"
            num += 1

        return slug


class UserMoviesLibrary(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="movies_library"
    )
    movies = models.ManyToManyField(Movie, related_name="movies_libraries")

    def __str__(self):
        return f"{self.user.email}'s Library"


@receiver(post_save, sender=CustomUser)
def create_user_library(sender, instance, created, **kwargs):
    if created:
        UserMoviesLibrary.objects.create(user=instance)
