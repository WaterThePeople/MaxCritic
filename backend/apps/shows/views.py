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
from .filters import ShowFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework.generics import ListAPIView
from django.db.models import Avg
from ..pagination import Pagination
from django.shortcuts import get_object_or_404
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK


class ShowCategoriesView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = ShowCategoriesSerializer
    queryset = ShowCategory.objects.all()


class ShowESRBView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = ShowESRBSerializer
    queryset = ShowESRB.objects.all()


class ShowsView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ShowsSerializer
    queryset = Show.objects.all()


class ShowReviewCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = ShowCreateReviewSerializer(
            data=request.data, context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ShowReviewDeleteView(APIView):
    def delete(self, request, id):
        try:
            review = ShowReview.objects.get(id=id)
            review.delete()
            return Response({'message': 'Review deleted successfully'}, status=status.HTTP_200_OK)
        except ShowReview.DoesNotExist:
            return Response({'error': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)


class ShowReviewEditView(APIView):
    def put(self, request, id):
        try:
            review = ShowReview.objects.get(id=id)
        except ShowReview.DoesNotExist:
            return Response({"error": "Review not found."}, status=status.HTTP_404_NOT_FOUND)
        if review.author != request.user and not request.user.is_staff:
            return Response({"error": "You are not authorized to edit this review."}, status=status.HTTP_403_FORBIDDEN)
        serializer = ShowEditReviewSerializer(
            review, data=request.data, context={'request': request}
        )
        if serializer.is_valid():
            updated_review = serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ShowView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, slug):
        try:
            item = Show.objects.get(slug=slug)
            serializer = ShowSerializer(item, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Show.DoesNotExist:
            return Response({"error": "Show not found"}, status=status.HTTP_404_NOT_FOUND)


class ShowsListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ShowsListSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = ShowFilter
    ordering_fields = ['average_score', 'release_date']
    ordering = ['-average_score']
    pagination_class = Pagination

    def get_queryset(self):
        return Show.objects.annotate(
            average_score=Avg('show_reviews__rating')
        )


class UserShowsLibraryView(ListAPIView):
    serializer_class = ShowsLibrarySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        try:
            user_shows_library = UserShowsLibrary.objects.get(
                user=self.request.user)
            return user_shows_library.shows.annotate(
                average_score=Avg('show_reviews__rating')
            )
        except UserShowsLibrary.DoesNotExist:
            return Show.objects.none()


class AddToShowsLibraryView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, show_id):
        show = get_object_or_404(Show, id=show_id)
        shows_library = request.user.shows_library
        shows_library.shows.add(show)
        return Response({"message": f"{show.name} added to your library."})


class RemoveFromShowsLibraryView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, show_id):
        show = get_object_or_404(Show, id=show_id)
        shows_library = request.user.shows_library
        if shows_library.shows.filter(id=show.id).exists():
            shows_library.shows.remove(show)
            return Response({"message": f"{show.name} removed from your library."}, status=HTTP_200_OK)
        else:
            return Response({"error": f"{show.name} is not in your library."}, status=HTTP_400_BAD_REQUEST)
