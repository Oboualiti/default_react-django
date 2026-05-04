from django_filters import rest_framework as django_filters
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Example
from .serializers import ExampleSerializer


class ExampleFilter(django_filters.FilterSet):
    status = django_filters.CharFilter(field_name='status')
    search = django_filters.CharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = Example
        fields = ['status']


class ExampleViewSet(viewsets.ModelViewSet):
    queryset = Example.objects.all()
    serializer_class = ExampleSerializer
    permission_classes = [IsAuthenticated]
    filterset_class = ExampleFilter
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'status', 'created_at']
    ordering = ['-created_at']
