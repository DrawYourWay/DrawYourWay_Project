import { PageHeader } from "@/components";
import { toaster } from "@/components/ui/toaster";
import { useRegister } from "@/hooks/useAuth";
import { BasicLayout } from "@/layouts";
import { RegisterFormSchema } from "@/types/forms/auth";
import { Button, Field, Input, Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";

interface RegisterForm {
  email: string;
  username: string;
  password: string;
  password2: string;
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: zodResolver(RegisterFormSchema) });

  const { mutateAsync, error, isPending } = useRegister();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const placeId = searchParams.get("place_id");

  console.log(placeId);

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync({
      email: data.email,
      login: data.username,
      password: data.password,
      password_confirm: data.password2,
    });

    if (placeId) {
      navigate(
        {
          pathname: "/login",
          search: `?place_id=${encodeURIComponent(placeId)}`,
        },
        { state: { welcome: true } }
      );
    } else {
      navigate("/login", { state: { welcome: true } });
    }
  });

  useEffect(() => {
    if (!error) return;

    if (error instanceof AxiosError) {
      toaster.create({
        title: "Error",
        description: error.response?.data.detail,
        type: "error",
        duration: 5000,
      });
    }
  }, [error]);

  return (
    <BasicLayout>
      <PageHeader
        subtitle="Create your account"
        preforwardText="Already have an account?"
        forwardLink="/login"
      />

      <form onSubmit={onSubmit} style={{ width: "100%", maxWidth: "300px" }}>
        <Stack justifyContent="center" alignItems="center">
          <Field.Root invalid={!!errors.username}>
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              size="xl"
              backgroundColor="lightGray"
              color="darkGray"
              borderBottom="0.5px solid"
            />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.username}>
            <Input
              type="text"
              placeholder="Username"
              {...register("username")}
              size="xl"
              backgroundColor="lightGray"
              color="darkGray"
            />
            <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              size="xl"
              backgroundColor="lightGray"
              color="darkGray"
              borderBottom="0.5px solid"
            />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password2}>
            <Input
              type="password"
              placeholder="Confirm Password"
              {...register("password2")}
              size="xl"
              backgroundColor="lightGray"
              color="darkGray"
              borderBottom="0.5px solid"
            />
            <Field.ErrorText>{errors.password2?.message}</Field.ErrorText>
          </Field.Root>

          <Button
            type="submit"
            disabled={isPending}
            loading={isPending}
            loadingText="Signing up..."
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
            Sign Up
          </Button>
        </Stack>
      </form>
    </BasicLayout>
  );
};

export default RegisterPage;
