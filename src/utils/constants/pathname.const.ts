export const pathnames = {
  root: "/",
  login: "/login",
  register: "/register",
} as const;

export type ValueOf<T> = T[keyof T];

export type RoutePath = ValueOf<typeof pathnames>;
