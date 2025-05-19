from rest_framework import serializers
from .models import Place
from drawings.serializers import DrawingPlaceSerializer


class PlaceSerializer(serializers.ModelSerializer):
    qr_code = serializers.ImageField(source="qr_code.image", read_only=True)
    drawings = DrawingPlaceSerializer(many=True)

    class Meta:
        model = Place
        fields = "__all__"
