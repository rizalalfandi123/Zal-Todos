// import type { Session } from '@supabase/supabase-js';

// import { create } from 'zustand';
// import { devtools, persist } from 'zustand/middleware';
// import { reduxDevtoolOptions, storeNames } from '../constants';

// export interface AuthState {
//  session: Session | null;
//  setSession: (session: Session) => void;
//  removeSession: () => void;
// }

// export const useAuthStore = create<AuthState>()(
//  devtools(
//   persist<AuthState>(
//    (set) => ({
//     session: null,
//     setSession: (session) => set(() => ({ session })),
//     removeSession: () => set(() => ({ session: null })),
//    }),
//    { name: 'zal-todos-auth' }
//   ),
//   {
//    store: storeNames.auth,
//    ...reduxDevtoolOptions,
//   }
//  )
// );

export {}