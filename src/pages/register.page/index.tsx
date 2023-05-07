import type { Theme, SxProps } from '@mui/material/styles';

import { loginSchema, TRegisterForm } from '@schemas';
import { useForm } from 'react-hook-form';
import { RegisterForm } from './register.form';
import { zodResolver } from '@hookform/resolvers/zod';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/lab/LoadingButton';

import { Link } from '@components';
import { pathnames, supabase, useRegister } from '@utils';
import { AuthTemplate, SocialAuthButton, TermAndPoilicyCaption } from '@templates';

const defaultValues: TRegisterForm = {
 email: '',
 password: '',
};

export const RegisterPage = () => {
 const { mutateAsync: login, isLoading } = useRegister();

 const registerWithGoogle = async () => await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: 'http://localhost:3010/login' } });

 const {
  control,
  handleSubmit,
  reset: resetForm,
 } = useForm<TRegisterForm>({
  defaultValues,
  resolver: zodResolver(loginSchema),
 });

 const onSubmit = async (data: TRegisterForm) => {
  await login(data);
  resetForm();
 };

 return (
  <AuthTemplate>
   <Typography variant='h4'>Register</Typography>

   <Stack spacing={1}>
    <SocialAuthButton provider='Google' onClick={registerWithGoogle}>
     Register With Google
    </SocialAuthButton>

    <SocialAuthButton provider='Facebook'>Register With Facebook</SocialAuthButton>
   </Stack>

   <RegisterForm control={control} />

   <Button onClick={handleSubmit(onSubmit)} loading={isLoading}>
    Register
   </Button>

   <TermAndPoilicyCaption />

   <Typography textAlign='center'>
    Already signed up? <Link to={pathnames.login}>Go to login</Link>
   </Typography>
  </AuthTemplate>
 );
};

export default RegisterPage;
