import type { Database } from '@interfaces';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { UseMutationOptions, UseMutationResult } from 'react-query';

import { useMutation } from 'react-query';

import { supabase } from '../config';
import { apiKey } from '../constants';

export type CreateTodoPayload = Database['public']['Tables']['todos']['Insert'];

type UseCreateTodoMutation = (
 options?: Partial<UseMutationOptions<PostgrestSingleResponse<null>, unknown, CreateTodoPayload>>
) => UseMutationResult<PostgrestSingleResponse<null>, unknown, CreateTodoPayload>;

export const useCreateTodoMutation: UseCreateTodoMutation = (options) => {
 return useMutation<PostgrestSingleResponse<null>, unknown, CreateTodoPayload>({
  mutationFn: async (payload) => await supabase.from('todos').insert(payload),
  mutationKey: [apiKey.todos],
  ...(options ?? {}),
 });
};
