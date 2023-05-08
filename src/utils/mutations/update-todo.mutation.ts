import type { Database } from '@interfaces';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { UseMutationOptions, UseMutationResult } from 'react-query';

import { useMutation } from 'react-query';

import { supabase } from '../config';
import { apiKey } from '../constants';

export type UpdateTodoPayload = Database['public']['Tables']['todos']['Update'];

type UseUpdateTodoMutation = (
 options?: Partial<UseMutationOptions<PostgrestSingleResponse<null>, unknown, UpdateTodoPayload>>
) => UseMutationResult<PostgrestSingleResponse<null>, unknown, UpdateTodoPayload>;

export const useUpdateTodoMutation: UseUpdateTodoMutation = (options) => {
 return useMutation<PostgrestSingleResponse<null>, unknown, UpdateTodoPayload>({
  mutationFn: async (payload) => await supabase.from('todos').update(payload).eq('id', payload.id),
  mutationKey: [apiKey.todos],
  ...(options ?? {}),
 });
};
