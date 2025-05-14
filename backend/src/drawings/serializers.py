from rest_framework import serializers

from .models import Drawing
from drf_extra_fields.fields import Base64ImageField


class DrawingSerializer(serializers.ModelSerializer):
    image = Base64ImageField()

    class Meta:
        model = Drawing
        fields = ["image"]
