from .views import DrawingListCreateView, DrawingRetrieveUpdateDestroyView
from django.urls import path

urlpatterns = [
    path("", DrawingListCreateView.as_view(), name="drawing-list-create"),
    path(
        "<int:pk>/", DrawingRetrieveUpdateDestroyView.as_view(), name="drawing-detail"
    ),
]
