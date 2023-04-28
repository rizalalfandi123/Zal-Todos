import type { AuthResponse } from '@supabase/supabase-js';
import type { UseMutationOptions, UseMutationResult } from 'react-query';

import { useMutation } from 'react-query';

import { supabase, apiKey } from '@utils';
import { TRegisterForm } from '@schemas';

type TUseRegister = (
 options?: Omit<UseMutationOptions<AuthResponse, unknown, TRegisterForm>, 'mutationFn' | 'mutationKey'>
) => UseMutationResult<AuthResponse, unknown, TRegisterForm>;

export const useRegister: TUseRegister = (options = {}) => {
 return useMutation<AuthResponse, unknown, TRegisterForm>({
  mutationFn: async (data) => await supabase.auth.signUp(data),

  mutationKey: [apiKey.login],

  ...options,
 });
};
