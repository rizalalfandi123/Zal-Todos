import { Database } from '@interfaces';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useMutation, UseMutationOptions, UseMutationResult, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { supabase } from '../config';
import { apiKey } from '../constants';

type SectionPayload = Database['public']['Tables']['sections']['Insert'];

type UseSectionMutation = (
 options?: Partial<UseMutationOptions<PostgrestSingleResponse<null>, unknown, SectionPayload>>
) => UseMutationResult<PostgrestSingleResponse<null>, unknown, SectionPayload>;

export const useSectionMutation: UseSectionMutation = (options) => {
 return useMutation<PostgrestSingleResponse<null>, unknown, SectionPayload>({
  mutationFn: async (payload) => await supabase.from('sections').insert(payload),
  mutationKey: [apiKey.sections],
  ...(options ?? {}),
 });
};
