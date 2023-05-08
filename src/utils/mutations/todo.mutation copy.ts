import type { Database } from '@interfaces';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { UseMutationOptions, UseMutationResult } from 'react-query';

import { useMutation } from 'react-query';

import { supabase } from '../config';
import { apiKey } from '../constants';

type TodoPayload = Database['public']['Tables']['todos']['Insert'];

type UseTodoMutation = (
 options?: Partial<UseMutationOptions<PostgrestSingleResponse<null>, unknown, TodoPayload>>
) => UseMutationResult<PostgrestSingleResponse<null>, unknown, TodoPayload>;

export const useTodoMutation: UseTodoMutation = (options) => {
 return useMutation<PostgrestSingleResponse<null>, unknown, TodoPayload>({
  mutationFn: async (payload) => await supabase.from('todos').insert(payload),
  mutationKey: [apiKey.todos],
  ...(options ?? {}),
 });
};
