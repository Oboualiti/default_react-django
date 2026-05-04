from rest_framework.routers import DefaultRouter
from .views import ExampleViewSet

router = DefaultRouter()
router.register('example', ExampleViewSet, basename='example')

urlpatterns = router.urls
