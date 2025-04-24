import { toaster } from "@/components/ui/toaster";
import { useLogin } from "@/hooks/useAuth";
import { BasicLayout } from "@/layouts";
import { LoginFormSchema } from "@/types/forms/login";
import {
  Box,
  Button,
  Field,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

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

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync({
      username: data.username,
      password: data.password,
    });
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
      <Box color="black">
        <Heading as="h1" size="6xl" textAlign="center" mb={4} font="main">
          Draw Your Way
        </Heading>
        <Heading as="h2" size="xl" textAlign="center" mb={4}>
          Log in
        </Heading>
        <Text textAlign="center">Don't have an account? Click here</Text>
      </Box>

      <form onSubmit={onSubmit}>
        <Stack
          justifyContent="center"
          alignItems="center"
          color="red"
          maxW="sm"
        >
          <Field.Root invalid={!!errors.username}>
            <Field.Label>Username</Field.Label>
            <Input type="text" {...register("username")} />
            <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            <Field.Label>Password</Field.Label>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          <Button type="submit" disabled={isPending}>
            Log In
          </Button>
        </Stack>
      </form>
    </BasicLayout>
  );
};

export default LoginPage;
