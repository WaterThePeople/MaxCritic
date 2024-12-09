import random
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from ...models import Movie, MovieReview
from datetime import date


class Command(BaseCommand):
    help = 'Create a review for each movie by each user'

    def handle(self, *args, **kwargs):
        # Get all users
        users = get_user_model().objects.all()

        # Get all movies
        movies = Movie.objects.all()

        # If no movies or users, exit the command
        if not movies or not users:
            self.stdout.write(self.style.WARNING('No movies or users found.'))
            return

        # Loop through each movie
        for movie in movies:
            for user in users:
                # Random rating between 0 and 100
                rating = random.randint(0, 100)

                # Determine the description based on the rating
                if rating <= 20:
                    description = "I really didn't enjoy this movie at all."
                elif rating <= 40:
                    description = "The movie had some interesting parts, but overall it was disappointing."
                elif rating <= 60:
                    description = "The movie was decent, but it has a lot of room for improvement."
                elif rating <= 80:
                    description = "Had a lot of fun playing this movie, but there's still some room for improvement."
                else:
                    description = "Absolutely loved the movie! Highly recommend it to everyone!"

                # Create the review
                review = MovieReview.objects.create(
                    rating=rating,
                    description=description,
                    date=date.today(),
                    author=user,
                    movie=movie
                )

                # Output progress in the terminal
                self.stdout.write(self.style.SUCCESS(
                    f'Review created for game "{movie.name}" by user "{user.username}"'))

        self.stdout.write(self.style.SUCCESS(
            'Reviews created for all movies and users.'))
