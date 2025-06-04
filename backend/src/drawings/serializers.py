from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers

from .models import Drawing


class DrawingSerializer(serializers.ModelSerializer):
    image = Base64ImageField()

    class Meta:
        model = Drawing
        fields = ["image"]


class DrawingPlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drawing
        fields = ["image", "place"]
