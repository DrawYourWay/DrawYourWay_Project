from rest_framework import viewsets
from .models import Feed
from .serializers import FeedSerializer

class FeedViewSet(viewsets.ModelViewSet):
    queryset = Feed.objects.all().order_by('-created_at')
    serializer_class = FeedSerializer