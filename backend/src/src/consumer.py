import json
from channels.generic.websocket import WebsocketConsumer
from places.models import Place
from drawings.serializers import DrawingSerializer


class MyConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        self.place_id = self.scope["url_route"]["kwargs"]["place_id"]
        drawings = Place.objects.get(id=self.place_id).drawings.all()
        drawings_urls = [drawing.image.url for drawing in drawings]
        self.send(text_data=json.dumps({"data": drawings_urls}))

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        pass
