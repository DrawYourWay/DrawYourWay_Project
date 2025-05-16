from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Drawing
from .serializers import DrawingSerializer


class DrawingListCreateView(ListCreateAPIView):
    queryset = Drawing.objects.all()
    serializer_class = DrawingSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DrawingRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Drawing.objects.all()
    serializer_class = DrawingSerializer

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)
