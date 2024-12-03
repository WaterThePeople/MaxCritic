import django_filters
from .models import Movie


class MovieFilter(django_filters.FilterSet):
    categories = django_filters.CharFilter(
        method='filter_by_categories',
        label="Filter by categories"
    )

    age = django_filters.CharFilter(
        method='filter_by_age',
        label="Filter by ESRB"
    )

    year1 = django_filters.NumberFilter(
        field_name='release_date__year',
        lookup_expr='gte',
        label="Filter by year after or equal to"
    )
    year2 = django_filters.NumberFilter(
        field_name='release_date__year',
        lookup_expr='lte',
        label="Filter by year before or equal to"
    )

    ordering = django_filters.OrderingFilter(
        fields=(
            ('average_score', 'average_score'),
            ('release_date', 'release_date'),
        ),
        field_labels={
            'average_score': 'Game Average Score',
            'release_date': 'Release Date',
        },
    )

    class Meta:
        model = Movie
        fields = ['categories', 'year1', 'year2', 'age']

    def filter_by_categories(self, queryset, name, value):
        category_names = value.split(',')
        return queryset.filter(categories__category_name__in=category_names).distinct()

    def filter_by_age(self, queryset, name, value):
        age_names = value.split(',')
        return queryset.filter(ESRB__rating_name__in=age_names).distinct()
