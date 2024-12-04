import random
from datetime import date, timedelta
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from ...models import Song, SongAuthors, SongCategory, SongProduction, SongESRB


class Command(BaseCommand):
    help = "Generate 20 test songs for testing"

    def handle(self, *args, **kwargs):
        # Fetch related model objects
        authors = list(SongAuthors.objects.all())
        categories = list(SongCategory.objects.all())
        productions = list(SongProduction.objects.all())
        esrb_ratings = list(SongESRB.objects.all())

        if not (authors and categories and productions and esrb_ratings):
            self.stdout.write(self.style.ERROR(
                "Please ensure all related models have some data."))
            return

        for i in range(20):
            # Generate random data
            name = f"Test Song {i + 1}"
            slug = slugify(name)
            youtube_video = f"https://youtube.com/watch?v=song{i + 1}"
            description = f"This is a description for Test Song {i + 1}."
            # Format as MM:SS
            duration = f"{random.randint(2, 6)}:{random.randint(0, 59):02}"
            production = random.choice(productions)
            esrb = random.choice(esrb_ratings)
            release_date = date.today() - timedelta(days=random.randint(0, 1000))

            # Create song instance
            song = Song.objects.create(
                name=name,
                slug=slug,
                youtube_video=youtube_video,
                description=description,
                duration=duration,
                production=production,
                ESRB=esrb,
                recently_added=random.choice([True, False]),
                release_date=release_date,
            )

            # Add many-to-many relationships
            song.authors.set(random.sample(authors, min(len(authors), 3)))
            song.categories.set(random.sample(
                categories, min(len(categories), 2)))

            # Save and output status
            song.save()
            self.stdout.write(self.style.SUCCESS(f"Created song: {song.name}"))

        self.stdout.write(self.style.SUCCESS(
            "Successfully generated 20 test songs."))
