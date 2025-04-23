import {
  Button,
  Field,
  Heading,
  Input,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BasicLayout } from "../../../layouts";
import { LoginFormSchema } from "../../../types/forms/login";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(LoginFormSchema) });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <BasicLayout>
      <Box color="black">
        <Heading as="h1" size="6xl" textAlign="center" mb={4} font="main">
          Draw Your Way
        </Heading>
        <Heading as="h2" size="xl" textAlign="center" mb={4}>
          Log in
        </Heading>
        <Text>Don't have</Text>
      </Box>

      <form onSubmit={onSubmit}>
        <Stack
          justifyContent="center"
          alignItems="center"
          color="red"
          maxW="sm"
        >
          <Field.Root invalid={!!errors.email}>
            <Field.Label>Login</Field.Label>
            <Input type="email" {...register("email")} />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
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

          <Button type="submit">Log In</Button>
        </Stack>
      </form>
    </BasicLayout>
  );
};

export default LoginPage;
