from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True)

    def validate(self, attrs):
        password1, password2 = attrs.get("password"), attrs.get("password_confirm")

        if password1 != password2:
            raise serializers.ValidationError({"password": "Passwords do not match."})

        return super().validate(attrs)

    def create(self, validated_data):
        username, email = validated_data["username"], validated_data["email"]

        new_user = User(username=username, email=email)
        new_user.set_password(validated_data["password"])
        new_user.save()

        return new_user
