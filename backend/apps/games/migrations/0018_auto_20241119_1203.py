from datetime import datetime
from django.db import migrations


def populate_created_at(apps, schema_editor):
    Game = apps.get_model('games', 'Game')
    default_date = datetime(2024, 1, 1)
    for game in Game.objects.filter(created_at__isnull=True):
        game.created_at = default_date
        game.save()


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0017_game_created_at'),
    ]

    operations = [
        migrations.RunPython(populate_created_at),
    ]
