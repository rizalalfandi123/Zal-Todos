import type { Theme, SxProps } from "@mui/material/styles";

import { loginSchema, TLoginForm } from "@schemas";
import { useForm } from "react-hook-form";
import { LoginForm } from "./login.form";
import { zodResolver } from "@hookform/resolvers/zod";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import { Button } from "@components";
import { useLogin } from "@utils";

const defaultValues: TLoginForm = {
  email: "",
  password: "",
};

const containerStyle: SxProps<Theme> = { height: "90vh", display: "flex", alignItems: "center" };

const LoginPage = () => {
  const { mutateAsync: login, isLoading } = useLogin();

  const { control, handleSubmit, reset: resetForm } = useForm<TLoginForm>({
    defaultValues,
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginForm) => {
    await login(data);
    resetForm();
  };


  return (
    <Container maxWidth="xs" sx={containerStyle}>
      <Stack spacing={4}>
        <LoginForm control={control} />

        <Button onClick={handleSubmit(onSubmit)} isLoading={isLoading}>
          Login
        </Button>
      </Stack>
    </Container>
  );
};

export default LoginPage;
