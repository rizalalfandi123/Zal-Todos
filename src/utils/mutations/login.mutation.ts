import type { AuthResponse } from '@supabase/supabase-js';

import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';

import { supabase, apiKey } from '@utils';
import { TLoginForm } from '@schemas';

type TUseLogin = (options?: Omit<UseMutationOptions<AuthResponse, unknown, TLoginForm>, 'mutationFn' | 'mutationKey'>) => UseMutationResult<AuthResponse, unknown, TLoginForm>;

export const useLogin: TUseLogin = (options = {}) => {
 return useMutation<AuthResponse, unknown, TLoginForm>({
  mutationFn: async (data) => await supabase.auth.signInWithPassword(data),

  mutationKey: [apiKey.login],

  ...options,
 });
};
