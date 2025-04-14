from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
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


class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, attrs):
        email = attrs.get("email")
        user = User.objects.filter(email=email)

        if not user.exists():
            raise serializers.ValidationError({"email": "Email does not exist."})

        self.user = user.first()

        return attrs


class NewPasswordSerializer(serializers.Serializer):
    token = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()
    password2 = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get("email")
        user = User.objects.filter(email=email)

        if not user.exists():
            raise serializers.ValidationError({"email": "Email does not exist."})

        self.user = user.first()

        token = attrs.get("token")
        is_token_correct = PasswordResetTokenGenerator().check_token(self.user, token)
        if not is_token_correct:
            raise serializers.ValidationError(
                {"token": "Incorrect password reset token."}
            )

        password, password2 = attrs.get("password"), attrs.get("password2")

        if password != password2:
            raise serializers.ValidationError({"password": "Passwords do not match."})

        return attrs
