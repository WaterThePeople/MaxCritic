from django.core.management.base import BaseCommand
from ...models import *


class Command(BaseCommand):
    help = "Create libraries for existing users who don't have one"

    def handle(self, *args, **kwargs):
        users_without_libraries = CustomUser.objects.filter(
            shows_library__isnull=True)
        for user in users_without_libraries:
            UserShowsLibrary.objects.create(user=user)
            self.stdout.write(self.style.SUCCESS(
                f"Library created for user: {user.email}"))
        self.stdout.write(self.style.SUCCESS("Libraries creation complete!"))
