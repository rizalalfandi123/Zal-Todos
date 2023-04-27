import type { TRegisterForm } from '@schemas';
import type { Control } from 'react-hook-form';

import Stack from '@mui/material/Stack';

import { TextField } from '@components';

interface RegisterFormProps {
 control: Control<TRegisterForm>;
}

export const RegisterForm = (props: RegisterFormProps) => {
 const { control } = props;

 return (
  <Stack spacing={2} width='100%'>
   <TextField<TRegisterForm, 'email'> name='email' control={control} label='Email' />

   <TextField<TRegisterForm, 'phone'> name='phone' control={control} label='Phone' />

   <TextField<TRegisterForm, 'password'> name='password' control={control} label='Password' />
  </Stack>
 );
};
