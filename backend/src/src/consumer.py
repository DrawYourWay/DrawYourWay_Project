import json

from channels.generic.websocket import WebsocketConsumer
from places.models import Place
from asgiref.sync import async_to_sync


class DrawingConsumer(WebsocketConsumer):
    def _get_drawings(self):
        drawings = (
            Place.objects.get(id=self.place_id)
            .drawings.all()
            .order_by("-created_at")[:30]
        )
        return [drawing.image.url for drawing in drawings]

    def connect(self):
        self.place_id = self.scope["url_route"]["kwargs"]["place_id"]
        self.group_name = f"place_{self.place_id}"
        async_to_sync(self.channel_layer.group_add)(self.group_name, self.channel_name)
        self.accept()
        self.send(text_data=json.dumps({"data": self._get_drawings()}))

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name, self.channel_name
        )

    def update_drawings(self, event):
        self.send(text_data=json.dumps({"data": self._get_drawings()}))
