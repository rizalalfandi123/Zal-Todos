import type { TLoginForm } from '@schemas';
import type { Control } from 'react-hook-form';

import Stack from '@mui/material/Stack';

import { TextField } from '@components';

interface LoginFormProps {
 control: Control<TLoginForm>;
}

export const LoginForm = (props: LoginFormProps) => {
 const { control } = props;

 return (
  <Stack spacing={2} width='100%'>
   <TextField<TLoginForm, 'email'> name='email' control={control} label='Email' />

   <TextField<TLoginForm, 'password'> name='password' control={control} label='Password' />
  </Stack>
 );
};
