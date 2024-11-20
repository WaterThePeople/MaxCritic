import django_filters
from .models import Game


class GameFilter(django_filters.FilterSet):
    platforms = django_filters.CharFilter(
        method='filter_by_platforms',
        label="Filter by platforms"
    )
    categories = django_filters.CharFilter(
        method='filter_by_categories',
        label="Filter by categories"
    )

    budget = django_filters.CharFilter(
        method='filter_by_budget',
        label="Filter by budget"
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
        model = Game
        fields = ['platforms', 'categories', 'year1', 'year2', 'budget', 'age']

    def filter_by_categories(self, queryset, name, value):
        category_names = value.split(',')
        return queryset.filter(categories__category_name__in=category_names).distinct()

    def filter_by_platforms(self, queryset, name, value):
        platform_names = value.split(',')
        return queryset.filter(platforms__platform_name__in=platform_names).distinct()

    def filter_by_budget(self, queryset, name, value):
        budget_names = value.split(',')
        return queryset.filter(budget__budget_name__in=budget_names).distinct()

    def filter_by_age(self, queryset, name, value):
        age_names = value.split(',')
        return queryset.filter(ESRB__rating_name__in=age_names).distinct()
