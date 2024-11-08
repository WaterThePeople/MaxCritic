from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from apps.main.views import *
from apps.games.views import *

router = routers.DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', CustomAuthToken.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('api/register/', RegisterView.as_view()),
    path('api/user/info/', UserInfoView.as_view()),
    path('api/games/list', GamesView.as_view()),
    path('api/games/<slug:slug>/', GameView.as_view()),
    path('api/games/reviews/create/', GameReviewCreateView.as_view()),
    path('api/games/categories', GameCategoriesView.as_view()),
    path('api/games/platforms', GamePlatformsView.as_view()),
    path('api/recent', RecentlyAddedView.as_view()),
]
