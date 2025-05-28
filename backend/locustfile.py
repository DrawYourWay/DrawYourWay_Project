import random

from locust import HttpUser, between, tag, task

user_number = 1


class User(HttpUser):
    wait_time = between(1, 5)
    refresh_token = None

    @tag("auth")
    @task(1)
    def create_user(self):
        global user_number
        user_number += 1
        self.client.post(
            "auth/register/",
            json={
                "username": f"user{user_number}",
                "email": f"test@{user_number}test.com",
                "password": "test123",
                "password_confirm": "test123",
            },
        )

    @tag("auth")
    @task(2)
    def login(self):
        global user_number
        random_user = random.randint(1, user_number)
        response = self.client.post(
            "auth/login/",
            json={
                "username": f"user{random_user}",
                "password": "test123",
            },
        )
        if response.status_code == 200 and "access" in response.json():
            tokens = response.json()
            access, refresh = tokens["access"], tokens["refresh"]
            self.refresh_token = refresh
            self.client.headers.update({"Authorization": f"Bearer {access}"})

    @tag("auth")
    @task(3)
    def refresh(self):
        if self.refresh_token:
            response = self.client.post(
                "auth/refresh/", json={"refresh": self.refresh_token}
            )
            if response.status_code == 200 and "access" in response.json():
                tokens = response.json()
                access = tokens["access"]
                self.client.headers.update({"Authorization": f"Bearer {access}"})

    @tag("places")
    @task(4)
    def places_list(self):
        self.client.get("places/")

    @tag("places")
    @task(5)
    def specific_place(self):
        self.client.get("places/1/")
