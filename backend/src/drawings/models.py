from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Drawing(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="drawings")
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to="media/drawings/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
