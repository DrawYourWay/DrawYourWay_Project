from django.urls import re_path
from .consumer import MyConsumer

websocket_urlpatterns = [
    re_path(r"ws/places/(?P<place_id>\w+)/$", MyConsumer.as_asgi()),
]
