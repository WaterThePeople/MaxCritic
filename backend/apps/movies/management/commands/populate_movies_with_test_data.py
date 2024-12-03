import random
from datetime import timedelta
from django.utils.text import slugify
from django.utils.timezone import now
from ...models import Movie, MovieActors, MovieCategory, MovieDirectors, MovieWriters, MovieProduction, MovieESRB


def create_test_movies():
    actors = list(MovieActors.objects.all())
    categories = list(MovieCategory.objects.all())
    directors = list(MovieDirectors.objects.all())
    writers = list(MovieWriters.objects.all())
    productions = list(MovieProduction.objects.all())
    esrb_ratings = list(MovieESRB.objects.all())
    if not (actors and categories and directors and writers and productions and esrb_ratings):
        print("Please populate the related models (actors, categories, etc.) before running this script.")
        return
    movie_names = [
        "The Great Adventure", "Mystery of the Lost City", "A Day in Space",
        "Battle of the Ages", "The Hidden Treasure", "Escape Plan Alpha",
        "Dream Chasers", "Legends of Tomorrow", "Forgotten Realms",
        "The Final Frontier", "Quest for Freedom", "Dawn of Justice",
        "Chronicles of Magic", "Shadows of the Past", "Echoes of Eternity",
        "Rising Dawn", "The Silent Witness", "Waves of Time",
        "Kingdom of Light", "Endless Horizon"
    ]

    for name in movie_names:
        movie = Movie(
            name=name,
            youtube_video=f"https://youtube.com/watch?v={random.randint(100000, 999999)}",
            description=f"A captivating tale of {name.lower()}.",
            duration=f"{random.randint(90, 180)} minutes",
            production=random.choice(productions),
            ESRB=random.choice(esrb_ratings),
            recently_added=random.choice([True, False]),
            release_date=now().date() - timedelta(days=random.randint(1, 1000)),
        )
        movie.slug = movie.generate_unique_slug()
        movie.save()

        movie.actors.set(random.sample(actors, min(3, len(actors))))
        movie.categories.set(random.sample(
            categories, min(2, len(categories))))
        movie.director.set(random.sample(directors, min(1, len(directors))))
        movie.writers.set(random.sample(writers, min(2, len(writers))))

        print(f"Created movie: {movie.name}")


create_test_movies()
