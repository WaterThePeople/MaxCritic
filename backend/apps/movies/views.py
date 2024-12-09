from rest_framework import generics
from .serializers.serializers import *
from .serializers.actors import *
from .serializers.categories import *
from .serializers.writers import *
from .serializers.esrb import *
from .serializers.directors import *
from .serializers.reviews import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .filters import MovieFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework.generics import ListAPIView
from django.db.models import Avg
from ..pagination import Pagination
from django.shortcuts import get_object_or_404
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK


class MovieCategoriesView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = MovieCategoriesSerializer
    queryset = MovieCategory.objects.all()


class MovieESRBView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = MovieESRBSerializer
    queryset = MovieESRB.objects.all()


class MoviesView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = MoviesSerializer
    queryset = Movie.objects.all()


class MovieReviewCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = MovieCreateReviewSerializer(
            data=request.data, context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MovieReviewDeleteView(APIView):
    def delete(self, request, id):
        try:
            review = MovieReview.objects.get(id=id)
            review.delete()
            return Response({'message': 'Review deleted successfully'}, status=status.HTTP_200_OK)
        except MovieReview.DoesNotExist:
            return Response({'error': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)


class MovieReviewEditView(APIView):
    def put(self, request, id):
        try:
            review = MovieReview.objects.get(id=id)
        except MovieReview.DoesNotExist:
            return Response({"error": "Review not found."}, status=status.HTTP_404_NOT_FOUND)
        if review.author != request.user and not request.user.is_staff:
            return Response({"error": "You are not authorized to edit this review."}, status=status.HTTP_403_FORBIDDEN)
        serializer = MovieEditReviewSerializer(
            review, data=request.data, context={'request': request}
        )
        if serializer.is_valid():
            updated_review = serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MovieView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, slug):
        try:
            item = Movie.objects.get(slug=slug)
            serializer = MovieSerializer(item, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Movie.DoesNotExist:
            return Response({"error": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)


class MoviesListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = MoviesListSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = MovieFilter
    ordering_fields = ['average_score', 'release_date']
    ordering = ['-average_score']
    pagination_class = Pagination

    def get_queryset(self):
        return Movie.objects.annotate(
            average_score=Avg('movie_reviews__rating')
        )


class UserMoviesLibraryView(ListAPIView):
    serializer_class = MoviesLibrarySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        try:
            user_movies_library = UserMoviesLibrary.objects.get(
                user=self.request.user)
            return user_movies_library.movies.annotate(
                average_score=Avg('movie_reviews__rating')
            )
        except UserMoviesLibrary.DoesNotExist:
            return Movie.objects.none()


class AddToMoviesLibraryView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, movie_id):
        movie = get_object_or_404(Movie, id=movie_id)
        movies_library = request.user.movies_library
        movies_library.movies.add(movie)
        return Response({"message": f"{movie.name} added to your library."})


class RemoveFromMoviesLibraryView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, movie_id):
        movie = get_object_or_404(Movie, id=movie_id)
        movies_library = request.user.movies_library
        if movies_library.movies.filter(id=movie.id).exists():
            movies_library.movies.remove(movie)
            return Response({"message": f"{movie.name} removed from your library."}, status=HTTP_200_OK)
        else:
            return Response({"error": f"{movie.name} is not in your library."}, status=HTTP_400_BAD_REQUEST)
