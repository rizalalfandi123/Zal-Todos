export const settingPathnames = {
 settings: '/app/settings',
 generalSettings: '/app/settings/general',
 themeSettings: '/app/settings/theme',
 sidebarSettings: '/app/settings/sidebar',
};

export const pathnames = {
 root: '/',
 login: '/login',
 register: '/register',
 app: '/app',
 inbox: '/app/inbox',
 today: '/app/today',
 upcoming: '/app/upcoming',
 ...settingPathnames,
} as const;

export type ValueOf<T> = T[keyof T];

export type RoutePath = ValueOf<typeof pathnames>;

export const host = import.meta.env.VITE_HOST_ADDRESS;
