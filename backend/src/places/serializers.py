from rest_framework import serializers

from .models import Place


class PlaceSerializer(serializers.ModelSerializer):
    qr_code = serializers.ImageField(source="qr_code.image", read_only=True)

    class Meta:
        model = Place
        fields = "__all__"
