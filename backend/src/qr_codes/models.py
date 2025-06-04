from django.db import models
from places.models import Place


class QrCode(models.Model):
    image = models.ImageField(upload_to="qr_codes/")
    place = models.OneToOneField(
        Place, on_delete=models.CASCADE, related_name="qr_code"
    )
