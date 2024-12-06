import os
import requests
from datetime import datetime
from django.core.management.base import BaseCommand
from ...models import Game  # Adjust based on your app name
from io import BytesIO


class Command(BaseCommand):
    help = 'Populate the Game database with data from RAWG'

    def fetch_games(self, start_year, end_year):
        api_key = "31e4662cb54447568a123bc293880a95"  # Replace with your RAWG API key
        base_url = "https://api.rawg.io/api/games"
        games = []

        for year in range(start_year, end_year + 1):
            params = {
                "key": api_key,
                "dates": f"{year}-01-01,{year}-12-31",
                "page_size": 3,  # Fetch 3 games per year
                "ordering": "-added",  # Order by rating
            }

            response = requests.get(base_url, params=params)
            response.raise_for_status()
            data = response.json()
            games += data["results"]

        return games

    def fetch_game_details(self, game_slug):
        api_key = "31e4662cb54447568a123bc293880a95"  # Replace with your RAWG API key
        base_url = f"https://api.rawg.io/api/games/{game_slug}"
        params = {"key": api_key}

        response = requests.get(base_url, params=params)
        response.raise_for_status()
        return response.json()

    def download_image(self, image_url):
        if not image_url:
            return None

        response = requests.get(image_url)
        response.raise_for_status()
        return BytesIO(response.content).read()

    def handle(self, *args, **kwargs):
        start_year = 2002
        end_year = 2025

        self.stdout.write(self.style.SUCCESS("Fetching data from RAWG..."))
        games_data = self.fetch_games(start_year, end_year)

        self.stdout.write(self.style.SUCCESS("Populating database..."))
        for game in games_data:
            try:
                release_date = (
                    datetime.strptime(game["released"], "%Y-%m-%d").date()
                    if game.get("released")
                    else None
                )

                # Fetch detailed game data for description and image
                detailed_data = self.fetch_game_details(game["slug"])
                description = detailed_data.get("description_raw", "")

                # Fetch image
                image_url = detailed_data.get("background_image", None)
                image_data = self.download_image(image_url)

                # Create or update the Game object
                Game.objects.update_or_create(
                    name=game["name"],
                    defaults={
                        "description": description,
                        "release_date": release_date,
                        "image": image_data,
                    },
                )
                self.stdout.write(self.style.SUCCESS(
                    f"Added/Updated game: {game['name']}"))
            except Exception as e:
                self.stderr.write(self.style.ERROR(
                    f"Failed to add game {game['name']}: {e}"))

        self.stdout.write(self.style.SUCCESS("Database population completed!"))
