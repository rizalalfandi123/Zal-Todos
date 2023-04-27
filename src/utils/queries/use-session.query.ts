import type { Session } from '@supabase/supabase-js';
import type { UseQueryOptions, UseQueryResult } from 'react-query';

import { useQuery } from 'react-query';
import { supabase, apiKey } from '@utils';

export type SessionResponse = Session | null;

type TUseSession = (options?: Omit<UseQueryOptions<SessionResponse>, 'queryFn' | 'queryKey'>) => UseQueryResult<SessionResponse>;

export const useSession: TUseSession = (options = {}) => {
 return useQuery<SessionResponse>({
  queryFn: async () => {
   const res = await supabase.auth.getSession();

   return res.data.session;
  },

  queryKey: [apiKey.session],

  ...options,
 });
};
