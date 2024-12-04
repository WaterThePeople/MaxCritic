import random
from datetime import date, timedelta
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from ...models import Show, ShowActors, ShowCategory, ShowDirectors, ShowWriters, ShowProduction, ShowESRB


class Command(BaseCommand):
    help = "Generate 20 test shows for testing"

    def handle(self, *args, **kwargs):
        # Fetch related model objects
        actors = list(ShowActors.objects.all())
        categories = list(ShowCategory.objects.all())
        directors = list(ShowDirectors.objects.all())
        writers = list(ShowWriters.objects.all())
        productions = list(ShowProduction.objects.all())
        esrb_ratings = list(ShowESRB.objects.all())

        if not (actors and categories and directors and writers and productions and esrb_ratings):
            self.stdout.write(self.style.ERROR(
                "Please ensure all related models have some data."))
            return

        for i in range(20):
            # Generate random data
            name = f"Test Show {i + 1}"
            slug = slugify(name)
            youtube_video = f"https://youtube.com/watch?v=video{i + 1}"
            description = f"This is a description for Test Show {i + 1}."
            episode_duration = f"{random.randint(20, 60)} minutes"
            episodes = random.randint(1, 20)
            production = random.choice(productions)
            esrb = random.choice(esrb_ratings)
            release_date = date.today() - timedelta(days=random.randint(0, 1000))

            # Create show instance
            show = Show.objects.create(
                name=name,
                slug=slug,
                youtube_video=youtube_video,
                description=description,
                episode_duration=episode_duration,
                episodes=episodes,
                production=production,
                ESRB=esrb,
                recently_added=random.choice([True, False]),
                release_date=release_date,
            )

            # Add many-to-many relationships
            show.actors.set(random.sample(actors, min(len(actors), 3)))
            show.categories.set(random.sample(
                categories, min(len(categories), 2)))
            show.director.set(random.sample(directors, min(len(directors), 2)))
            show.writers.set(random.sample(writers, min(len(writers), 2)))

            # Save and output status
            show.save()
            self.stdout.write(self.style.SUCCESS(f"Created show: {show.name}"))

        self.stdout.write(self.style.SUCCESS(
            "Successfully generated 20 test shows."))
