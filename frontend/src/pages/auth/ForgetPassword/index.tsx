import { PageHeader } from "@/components";
import { toaster } from "@/components/ui/toaster";
import { useChangePassword, usePasswordReset } from "@/hooks/useAuth";
import { BasicLayout } from "@/layouts";
import {
  ForgetPasswordFormSchema,
  ResetPasswordFormSchema,
} from "@/types/forms/auth";
import { Button, Field, Input, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";

interface ForgetPasswordForm {
  email: string;
}

interface ResetPasswordForm {
  password: string;
  password2: string;
}

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordForm>({
    resolver: zodResolver(ForgetPasswordFormSchema),
  });

  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(ResetPasswordFormSchema),
  });

  const { mutateAsync, error, isPending } = usePasswordReset();
  const {
    mutateAsync: mutateChangePassword,
    error: changePasswordError,
    isPending: changePasswordPending,
  } = useChangePassword();

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const emailFromUrl = searchParams.get("email");
  const codeFromUrl = searchParams.get("code");

  const [codeSent, setCodeSent] = useState(false);

  const isCodeStep = !!emailFromUrl && !!codeFromUrl;

  const onSendCode = handleSubmit(async (data) => {
    const response = await mutateAsync({ email: data.email });
    console.log(response);
    setCodeSent(true);
  });

  const onResetPassword = handlePasswordSubmit(async (data) => {
    await mutateChangePassword({
      email: emailFromUrl as string,
      token: codeFromUrl as string,
      password: data.password,
      password2: data.password2,
    });
    navigate("/login", { state: { passwordReset: true } });
  });

  useEffect(() => {
    if (error instanceof AxiosError) {
      toaster.create({
        title: "Error",
        description: error.response?.data?.email || "Something went wrong",
        type: "error",
        duration: 5000,
      });
    } else if (changePasswordError instanceof AxiosError) {
      toaster.create({
        title: "Error",
        description:
          changePasswordError.response?.data?.details || "Something went wrong",
        type: "error",
        duration: 5000,
      });
    }
  }, [error, changePasswordError]);

  return (
    <BasicLayout>
      {!isCodeStep ? (
        <PageHeader
          subtitle="Forget password"
          preforwardText="Don't need it anymore?"
          forwardLink="/login"
        />
      ) : (
        <PageHeader subtitle="Change password" />
      )}

      {/* Krok 1: Formularz wysyłania maila */}
      {!isCodeStep && !codeSent && (
        <form
          onSubmit={onSendCode}
          style={{ width: "100%", maxWidth: "300px" }}
        >
          <Stack justifyContent="center" alignItems="center" color="red">
            <Field.Root invalid={!!errors.email}>
              <Input
                type="email"
                placeholder="Email"
                {...register("email")}
                size="xl"
                backgroundColor="lightGray"
                color="darkGray"
              />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>

            <Button
              type="submit"
              disabled={isPending}
              loading={isPending}
              loadingText="Sending..."
              backgroundColor="darkGray"
              color="white"
              fontSize="lg"
              paddingTop={6}
              paddingBottom={6}
              width="80%"
              mt={4}
              fontWeight="bold"
              borderRadius={30}
            >
              Send Code
            </Button>
          </Stack>
        </form>
      )}

      {!isCodeStep && codeSent && (
        <Text fontFamily="inter" color="black">
          Code was sent to your email. Check your inbox!
        </Text>
      )}

      {isCodeStep && (
        <form
          onSubmit={onResetPassword}
          style={{ width: "100%", maxWidth: "300px" }}
        >
          <Stack justifyContent="center" alignItems="center" color="red">
            <Field.Root invalid={!!passwordErrors.password}>
              <Input
                type="password"
                placeholder="New password"
                size="xl"
                backgroundColor="lightGray"
                {...passwordRegister("password")}
                color="darkGray"
              />
              <Field.ErrorText>
                {passwordErrors.password?.message}
              </Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!passwordErrors.password2}>
              <Input
                type="password"
                placeholder="Confirm new password"
                size="xl"
                backgroundColor="lightGray"
                {...passwordRegister("password2")}
                color="darkGray"
              />
              <Field.ErrorText>
                {passwordErrors.password2?.message}
              </Field.ErrorText>
            </Field.Root>

            <Button
              type="submit"
              disabled={changePasswordPending}
              loading={changePasswordPending}
              loadingText="Resetting..."
              backgroundColor="darkGray"
              color="white"
              fontSize="lg"
              paddingTop={6}
              paddingBottom={6}
              width="80%"
              mt={4}
              fontWeight="bold"
              borderRadius={30}
            >
              Reset Password
            </Button>
          </Stack>
        </form>
      )}
    </BasicLayout>
  );
};

export default ForgetPassword;
