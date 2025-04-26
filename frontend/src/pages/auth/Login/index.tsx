import { toaster } from "@/components/ui/toaster";
import { useLogin } from "@/hooks/useAuth";
import { BasicLayout } from "@/layouts";
import { LoginFormSchema } from "@/types/forms/auth";
import {
  Box,
  Button,
  Field,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router";

interface LoginForm {
  username: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(LoginFormSchema) });

  const { mutateAsync, error, isPending } = useLogin();

  const navigate = useNavigate();
  const location = useLocation();
  const { welcome: shouldWelcome } = location.state || {};

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync({
      username: data.username,
      password: data.password,
    });
    navigate("/feed");
  });

  useEffect(() => {
    if (shouldWelcome) {
      toaster.create({
        title: "Welcome",
        description: "You have successfully registered. Log in to continue.",
        type: "success",
        duration: 5000,
      });
    } else if (error instanceof AxiosError) {
      toaster.create({
        title: "Error",
        description: error.response?.data.detail,
        type: "error",
        duration: 5000,
      });
    }
  }, [error, shouldWelcome]);

  return (
    <BasicLayout>
      <Box color="black" p={5}>
        <Heading
          as="h2"
          size={["3xl", "4xl"]}
          textAlign="center"
          mb={[8, 12]}
          fontFamily="armstrong"
        >
          Draw Your Way
        </Heading>
        <Heading
          as="h2"
          size={["xl", "2xl"]}
          textAlign="center"
          mb={4}
          fontFamily="inter"
        >
          Log in
        </Heading>
        <Text textAlign="center" fontSize={["lg", "xl"]}>
          Don't have an account?{" "}
          <Link variant="underline" color="link" href="/register">
            Click here
          </Link>
        </Text>
      </Box>

      <form onSubmit={onSubmit} style={{ width: "100%", maxWidth: "300px" }}>
        <Stack justifyContent="center" alignItems="center" color="red">
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
            />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          <Button
            type="submit"
            disabled={isPending}
            loading={isPending}
            loadingText="Logging in..."
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
            Log In
          </Button>
        </Stack>
      </form>
    </BasicLayout>
  );
};

export default LoginPage;
