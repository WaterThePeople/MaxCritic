from rest_framework import generics
from .serializers.serializers import *
from .serializers.authors import *
from .serializers.categories import *
from .serializers.esrb import *
from .serializers.reviews import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .filters import SongFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework.generics import ListAPIView
from django.db.models import Avg
from ..pagination import Pagination
from django.shortcuts import get_object_or_404
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK


class SongCategoriesView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = SongCategoriesSerializer
    queryset = SongCategory.objects.all()


class SongESRBView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = SongESRBSerializer
    queryset = SongESRB.objects.all()


class SongsView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = SongsSerializer
    queryset = Song.objects.all()


class SongReviewCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = SongCreateReviewSerializer(
            data=request.data, context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SongReviewDeleteView(APIView):
    def delete(self, request, id):
        try:
            review = SongReview.objects.get(id=id)
            review.delete()
            return Response({'message': 'Review deleted successfully'}, status=status.HTTP_200_OK)
        except SongReview.DoesNotExist:
            return Response({'error': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)


class SongReviewEditView(APIView):
    def put(self, request, id):
        try:
            review = SongReview.objects.get(id=id)
        except SongReview.DoesNotExist:
            return Response({"error": "Review not found."}, status=status.HTTP_404_NOT_FOUND)
        if review.author != request.user and not request.user.is_staff:
            return Response({"error": "You are not authorized to edit this review."}, status=status.HTTP_403_FORBIDDEN)
        serializer = SongEditReviewSerializer(
            review, data=request.data, context={'request': request}
        )
        if serializer.is_valid():
            updated_review = serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SongView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, slug):
        try:
            item = Song.objects.get(slug=slug)
            serializer = SongSerializer(item, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Song.DoesNotExist:
            return Response({"error": "Song not found"}, status=status.HTTP_404_NOT_FOUND)


class SongsListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = SongsListSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = SongFilter
    ordering_fields = ['average_score', 'release_date']
    ordering = ['-average_score']
    pagination_class = Pagination

    def get_queryset(self):
        return Song.objects.annotate(
            average_score=Avg('song_reviews__rating')
        )


class UserSongsLibraryView(ListAPIView):
    serializer_class = SongsLibrarySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        try:
            user_songs_library = UserSongsLibrary.objects.get(
                user=self.request.user)
            return user_songs_library.songs.annotate(
                average_score=Avg('song_reviews__rating')
            )
        except UserSongsLibrary.DoesNotExist:
            return Song.objects.none()


class AddToSongsLibraryView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, song_id):
        song = get_object_or_404(Song, id=song_id)
        songs_library = request.user.songs_library
        songs_library.songs.add(song)
        return Response({"message": f"{song.name} added to your library."})


class RemoveFromSongsLibraryView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, song_id):
        song = get_object_or_404(Song, id=song_id)
        songs_library = request.user.songs_library
        if songs_library.songs.filter(id=song.id).exists():
            songs_library.songs.remove(song)
            return Response({"message": f"{song.name} removed from your library."}, status=HTTP_200_OK)
        else:
            return Response({"error": f"{song.name} is not in your library."}, status=HTTP_400_BAD_REQUEST)
