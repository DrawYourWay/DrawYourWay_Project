from django.apps import AppConfig


class DrawingsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "drawings"

    def ready(self):
        import drawings.signals

        return super().ready()
