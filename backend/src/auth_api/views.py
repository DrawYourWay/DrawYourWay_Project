from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import (
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
        serializer.save()
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

        return Response(
            {"message": "Password reset link sent", "token": token},
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
