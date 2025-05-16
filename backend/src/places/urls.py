from django.urls import path

from .views import PlaceDetailView, PlaceListView

urlpatterns = [
    path("", PlaceListView.as_view(), name="place-list"),
    path("<int:pk>/", PlaceDetailView.as_view(), name="place-detail"),
]
