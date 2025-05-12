# filepath: backend/src/feed/apps.py
from django.apps import AppConfig

class FeedConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'feed'