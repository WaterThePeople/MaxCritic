from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from apps.main.views import *
from apps.games.views import *
from apps.movies.views import *

router = routers.DefaultRouter()

urlpatterns = [
    # Admin and authentication endpoints
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', CustomAuthToken.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('api/register/', RegisterView.as_view()),
    path('api/search/', SearchView.as_view()),
    path('api/user/info/', UserInfoView.as_view()),
    path('api/user/image/', UserImageView.as_view()),
    path('api/user/username/', ChangeUsernameView.as_view()),
    path('api/user/password/change/', ChangePasswordView.as_view()),
    path('api/user/profile/<str:username>/', UserProfileView.as_view()),

    # Game-related endpoints
    path('api/games/list', GamesListView.as_view()),
    path('api/games/<slug:slug>/', GameView.as_view()),
    path('api/games/reviews/create/', GameReviewCreateView.as_view()),
    path('api/games/review/delete/<int:id>/', GameReviewDeleteView.as_view()),
    path('api/games/review/edit/<int:id>/', GameReviewEditView.as_view()),
    path('api/games/categories', GameCategoriesView.as_view()),
    path('api/games/age', GameESRBView.as_view()),
    path('api/games/platforms', GamePlatformsView.as_view()),
    path('api/games/budgets', GameBudgetView.as_view()),
    path('api/games/library', UserGamesLibraryView.as_view()),
    path('api/games/library/add/<int:game_id>/',
         AddToGamesLibraryView.as_view()),
    path('api/games/library/remove/<int:game_id>/',
         RemoveFromGamesLibraryView.as_view()),

    # Movie-related endpoints
    path('api/movies/list', MoviesListView.as_view()),
    path('api/movies/<slug:slug>/', MovieView.as_view()),
    path('api/movies/reviews/create/', MovieReviewCreateView.as_view()),
    path('api/movies/review/delete/<int:id>/', MovieReviewDeleteView.as_view()),
    path('api/movies/review/edit/<int:id>/', MovieReviewEditView.as_view()),
    path('api/movies/categories', MovieCategoriesView.as_view()),
    path('api/movies/age', MovieESRBView.as_view()),
    path('api/movies/library', UserMoviesLibraryView.as_view()),
    path('api/movies/library/add/<int:movie_id>/',
         AddToMoviesLibraryView.as_view()),
    path('api/movies/library/remove/<int:movie_id>/',
         RemoveFromMoviesLibraryView.as_view()),

    # Miscellaneous endpoints
    path('api/recent', RecentlyAddedView.as_view()),
]
