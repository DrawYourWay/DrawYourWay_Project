from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

from .views import (
    ChangePasswordView,
    CustomTokenObtainPairView,
    RegisterApiView,
    ResetPasswordView,
)

urlpatterns = [
    path("login/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("register/", RegisterApiView.as_view(), name="register"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("reset-password/", ResetPasswordView.as_view(), name="reset_password"),
    path("new-password/", ChangePasswordView.as_view(), name="new_password"),
]
