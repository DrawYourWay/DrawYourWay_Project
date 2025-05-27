from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.db.utils import IntegrityError
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import (
    CustomTokenObtainPairSerializer,
    NewPasswordSerializer,
    RegisterSerializer,
    ResetPasswordSerializer,
)


class NoPermAuthView(APIView):
    authentication_classes = []
    permission_classes = (AllowAny,)


class RegisterApiView(NoPermAuthView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            serializer.save()
        except IntegrityError as e:
            if "email" in str(e):
                return Response(
                    {"detail": "User with this email already exists"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            elif "username" in str(e):
                return Response(
                    {"detail": "User with this username already exists"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            else:
                return Response(
                    {"detail": "An unexpected error occurred"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

        return Response(
            {"message": "User registered successfully"},
            status=status.HTTP_201_CREATED,
        )


class ResetPasswordView(NoPermAuthView):
    serializer_class = ResetPasswordSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.user
        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user)

        password_reset_link = (
            settings.FORGET_PASSWORD_URL + f"?code={token}&email={user.email}"
        )

        send_mail(
            subject="Password Reset Request",
            message=f"Click the link to reset your password: {password_reset_link}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
        )

        return Response(
            {"message": "Password reset link sent to provided email", "token": token},
            status=status.HTTP_200_OK,
        )


class ChangePasswordView(NoPermAuthView):
    serializer_class = NewPasswordSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.user
        user.set_password(serializer.validated_data["password"])
        user.save()
        return Response(
            {"message": "Password changed successfully"},
            status=status.HTTP_200_OK,
        )


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
