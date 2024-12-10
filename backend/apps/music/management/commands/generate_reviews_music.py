import random
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from ...models import Song, SongReview
from datetime import date


class Command(BaseCommand):
    help = 'Create a review for each song by each user'

    def handle(self, *args, **kwargs):
        # Get all users
        users = get_user_model().objects.all()

        # Get all songs
        songs = Song.objects.all()

        # If no songs or users, exit the command
        if not songs or not users:
            self.stdout.write(self.style.WARNING('No songs or users found.'))
            return

        # Loop through each song
        for song in songs:
            for user in users:
                # Random rating between 0 and 100
                rating = random.randint(0, 100)

                # Determine the description based on the rating
                if rating <= 20:
                    description = "I really didn't enjoy this song at all."
                elif rating <= 40:
                    description = "The song had some interesting parts, but overall it was disappointing."
                elif rating <= 60:
                    description = "The song was decent, but it has a lot of room for improvement."
                elif rating <= 80:
                    description = "Had a lot of fun playing this song, but there's still some room for improvement."
                else:
                    description = "Absolutely loved the song! Highly recommend it to everyone!"

                # Create the review
                review = SongReview.objects.create(
                    rating=rating,
                    description=description,
                    date=date.today(),
                    author=user,
                    song=song
                )

                # Output progress in the terminal
                self.stdout.write(self.style.SUCCESS(
                    f'Review created for game "{song.name}" by user "{user.username}"'))

        self.stdout.write(self.style.SUCCESS(
            'Reviews created for all songs and users.'))
