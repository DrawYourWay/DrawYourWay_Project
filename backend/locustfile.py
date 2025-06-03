import base64
import random
from locust import HttpUser, between, tag, task

user_number = 1


class User(HttpUser):
    wait_time = between(1, 5)
    refresh_token = None
    username = None

    def on_start(self):
        """Rejestruje nowego użytkownika i loguje go na początku."""
        global user_number
        user_number += 1
        self.username = f"user{user_number}"
        email = f"test@{user_number}test.com"
        password = "test123"

        # Rejestracja
        register_response = self.client.post(
            "auth/register/",
            json={
                "username": self.username,
                "email": email,
                "password": password,
                "password_confirm": password,
            },
        )

        # Logowanie tylko jeśli rejestracja się udała
        if register_response.status_code == 201:
            login_response = self.client.post(
                "auth/login/",
                json={
                    "username": self.username,
                    "password": password,
                },
            )
            if "access" in login_response.json():
                tokens = login_response.json()
                access, refresh = tokens["access"], tokens["refresh"]
                self.refresh_token = refresh
                self.client.headers.update({"Authorization": f"Bearer {access}"})

    @tag("auth")
    @task(1)
    def refresh(self):
        if self.refresh_token:
            response = self.client.post(
                "auth/refresh/", json={"refresh": self.refresh_token}
            )
            if response.status_code == 200 and "access" in response.json():
                access = response.json()["access"]
                self.client.headers.update({"Authorization": f"Bearer {access}"})

    @tag("places")
    @task(2)
    def places_list(self):
        self.client.get("places/")

    @tag("places")
    @task(3)
    def specific_place(self):
        self.client.get("places/1/")

    @tag("drawings")
    @task(4)
    def drawings_list(self):
        self.client.get("drawings/")

    @tag("drawings")
    @task(5)
    def create_drawing(self):
        with open(
            "/Users/mateuszc/Desktop/EPS/Code/backend/src/media/drawings/isep.png", "rb"
        ) as image:
            image_b64 = base64.b64encode(image.read()).decode("utf-8")
            self.client.post(
                "drawings/",
                data={"image": f"data:image/png;base64,{image_b64}", "place_id": 1},
                headers={
                    "Authorization": self.client.headers.get("Authorization"),
                },
            )
