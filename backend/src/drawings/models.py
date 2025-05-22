from django.contrib.auth import get_user_model
from django.db import models
from places.models import Place

User = get_user_model()


class Drawing(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="drawings")
    image = models.ImageField(upload_to="drawings/")
    place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name="drawings")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.created_at)
