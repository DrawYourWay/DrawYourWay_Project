import io

import qrcode
from django.core.files import File
from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand
from places.models import Place
from qr_codes.models import QrCode
from src import settings


class Command(BaseCommand):
    help = "Create a new place with a QR code"

    def add_arguments(self, parser):
        parser.add_argument("--place_name", type=str, default="ISEP")
        parser.add_argument("--city", type=str, default="Porto")
        parser.add_argument("--country", type=str, default="Portugal")
        parser.add_argument("--latitude", type=float, default=41.14961)
        parser.add_argument("--longitude", type=float, default=-8.61099)
        parser.add_argument("--description", type=str, default="ISEP is a school")
        parser.add_argument("--image", type=str, default="media/places/isep.png")

    def handle(self, *args, **options):
        image_path = options["image"]
        with open(image_path, "rb") as img_file:
            new_place = Place(
                place_name=options["place_name"],
                city=options["city"],
                country=options["country"],
                latitude=options["latitude"],
                longitude=options["longitude"],
                description=options["description"],
            )
            new_place.image.save(image_path.split("/")[-1], File(img_file), save=False)
            new_place.save()

        url = settings.PLACE_URL + f"?place_id={new_place.pk}"
        print(url)

        qr_code_img = qrcode.make(url)
        buffer = io.BytesIO()
        qr_code_img.save(buffer, format="PNG")
        qr_code_file = ContentFile(buffer.getvalue(), name=f"qr_{new_place.pk}.png")

        new_qr_code = QrCode(image=qr_code_file, place=new_place)
        new_qr_code.save()
