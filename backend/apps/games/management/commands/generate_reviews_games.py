import random
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from ...models import Game, GameReview
from datetime import date


class Command(BaseCommand):
    help = 'Create a review for each game by each user'

    def handle(self, *args, **kwargs):
        # Get all users
        users = get_user_model().objects.all()

        # Get all games
        games = Game.objects.all()

        # If no games or users, exit the command
        if not games or not users:
            self.stdout.write(self.style.WARNING('No games or users found.'))
            return

        # Loop through each game
        for game in games:
            for user in users:
                # Random rating between 0 and 100
                rating = random.randint(0, 100)

                # Determine the description based on the rating
                if rating <= 20:
                    description = "I really didn't enjoy this game at all."
                elif rating <= 40:
                    description = "The game had some interesting parts, but overall it was disappointing."
                elif rating <= 60:
                    description = "The game was decent, but it has a lot of room for improvement."
                elif rating <= 80:
                    description = "Had a lot of fun playing this game, but there's still some room for improvement."
                else:
                    description = "Absolutely loved the game! Highly recommend it to everyone!"

                # Random platform selection (assuming platforms are already assigned to the game)
                platforms = game.platforms.all()
                if platforms.exists():
                    platform = random.choice(platforms)
                else:
                    platform = None

                # Create the review
                review = GameReview.objects.create(
                    rating=rating,
                    description=description,
                    date=date.today(),
                    author=user,
                    game=game
                )

                # Assign the platform using the set() method
                if platform:
                    # Assigning a list with one element
                    review.platform.set([platform])

                # Output progress in the terminal
                self.stdout.write(self.style.SUCCESS(
                    f'Review created for game "{game.name}" by user "{user.username}"'))

        self.stdout.write(self.style.SUCCESS(
            'Reviews created for all games and users.'))
