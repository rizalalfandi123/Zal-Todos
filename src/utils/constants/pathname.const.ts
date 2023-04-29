export const pathnames = {
 root: '/',
 login: '/login',
 register: '/register',
 app: '/app',
 inbox: '/app/inbox',
 today: '/app/today',
 upcoming: '/app/upcoming',
 settings: '/app/settings'
} as const;

export type ValueOf<T> = T[keyof T];

export type RoutePath = ValueOf<typeof pathnames>;

export const host = window.location.origin;
