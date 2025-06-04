from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Drawing


@receiver(post_save, sender=Drawing)
def drawing_saved(sender, instance, created, **kwargs):
    print("SYGNAL")
    channel_layer = get_channel_layer()
    group_name = f"place_{instance.place.id}"
    async_to_sync(channel_layer.group_send)(
        group_name,
        {
            "type": "update.drawings",
        },
    )
