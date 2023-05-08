import type { Database } from '@interfaces';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { UseMutationOptions, UseMutationResult } from 'react-query';

import { useMutation } from 'react-query';

import { supabase } from '../config';
import { apiKey } from '../constants';

type UseDeleteTodoMutation = (
 idTodo: string,
 options?: Partial<UseMutationOptions<PostgrestSingleResponse<null>, unknown, void>>
) => UseMutationResult<PostgrestSingleResponse<null>, unknown, void>;

export const useDeleteTodoMutation: UseDeleteTodoMutation = (id, options) => {
 return useMutation<PostgrestSingleResponse<null>, unknown, void>({
  mutationFn: async () => await supabase.from('todos').delete().eq('id', id),
  mutationKey: [apiKey.todos],
  ...(options ?? {}),
 });
};
