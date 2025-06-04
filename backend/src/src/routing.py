from django.urls import re_path
from .consumer import DrawingConsumer

websocket_urlpatterns = [
    re_path(r"ws/places/(?P<place_id>\w+)/$", DrawingConsumer.as_asgi()),
]
