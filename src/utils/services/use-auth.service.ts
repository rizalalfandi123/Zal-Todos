import type { Session } from '@supabase/supabase-js';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { supabase } from '../config';
import { reduxDevtoolOptions, storeNames } from '../constants';

interface AuthState {
 session: Session | null;
}

const defaultValues: AuthState = {
 session: null,
};

const getInitialValues = async () => {
 const { data } = await supabase.auth.getSession();

 if (!data.session) {
  return defaultValues.session;
 }

 return data.session;
};

export const useAuthStore = create<AuthState>()(
 devtools(
  (set, get) => {
   return {
    session: null,
   };
  },
  {
   store: storeNames.auth,
   ...reduxDevtoolOptions,
  }
 )
);

getInitialValues().then((session) => useAuthStore.setState({ session }));
