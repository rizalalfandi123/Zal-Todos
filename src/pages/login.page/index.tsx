import type { Theme, SxProps } from '@mui/material/styles';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { LoginForm } from './login.form';
import { loginSchema, TLoginForm } from '@schemas';
import { Button, Link } from '@components';
import { host, pathnames, supabase, useLogin } from '@utils';
import { AuthTemplate, SocialAuthButton, TermAndPoilicyCaption } from '@templates';

const defaultValues: TLoginForm = {
 email: '',
 password: '',
};

export const LoginPage = () => {
 const { mutateAsync: loginWithEmail, isLoading } = useLogin();

 const loginWithGoogle = async () => {
  const response = await supabase.auth.signInWithOAuth({
   provider: 'google',
   options: { redirectTo: host + pathnames.inbox },
  });

  console.log({ response });
 };
 const {
  control,
  handleSubmit,
  reset: resetForm,
 } = useForm<TLoginForm>({
  defaultValues,
  resolver: zodResolver(loginSchema),
 });

 const onSubmit = async (data: TLoginForm) => {
  await loginWithEmail(data);

  resetForm();
 };

 return (
  <AuthTemplate>
   <Typography variant='h4'>Login</Typography>

   <Stack spacing={1}>
    <SocialAuthButton provider='Google' onClick={loginWithGoogle}>
     Login With Google
    </SocialAuthButton>

    <SocialAuthButton provider='Facebook'>Login With Facebook</SocialAuthButton>
   </Stack>

   <LoginForm control={control} />

   <Button onClick={handleSubmit(onSubmit)} isLoading={isLoading}>
    Login
   </Button>

   <TermAndPoilicyCaption />

   <Typography textAlign='center'>
    Don't have an account? <Link to={pathnames.register}>Sign up</Link>
   </Typography>
  </AuthTemplate>
 );
};

export default LoginPage;
