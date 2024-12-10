import random
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from ...models import Show, ShowReview
from datetime import date


class Command(BaseCommand):
    help = 'Create a review for each show by each user'

    def handle(self, *args, **kwargs):
        # Get all users
        users = get_user_model().objects.all()

        # Get all shows
        shows = Show.objects.all()

        # If no shows or users, exit the command
        if not shows or not users:
            self.stdout.write(self.style.WARNING('No shows or users found.'))
            return

        # Loop through each show
        for show in shows:
            for user in users:
                # Random rating between 0 and 100
                rating = random.randint(0, 100)

                # Determine the description based on the rating
                if rating <= 20:
                    description = "I really didn't enjoy this show at all."
                elif rating <= 40:
                    description = "The show had some interesting parts, but overall it was disappointing."
                elif rating <= 60:
                    description = "The show was decent, but it has a lot of room for improvement."
                elif rating <= 80:
                    description = "Had a lot of fun playing this show, but there's still some room for improvement."
                else:
                    description = "Absolutely loved the show! Highly recommend it to everyone!"

                # Create the review
                review = ShowReview.objects.create(
                    rating=rating,
                    description=description,
                    date=date.today(),
                    author=user,
                    show=show
                )

                # Output progress in the terminal
                self.stdout.write(self.style.SUCCESS(
                    f'Review created for game "{show.name}" by user "{user.username}"'))

        self.stdout.write(self.style.SUCCESS(
            'Reviews created for all shows and users.'))
