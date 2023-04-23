import { RouteApp } from "@interfaces";
import { pathnames } from "@utils";
import { lazy } from "react";

const LoginPage = lazy(() => import("@pages/login.page"));
const RegisterPage = lazy(() => import("@pages/register.page"));

export const authRoutes: RouteApp[] = [
  {
    path: pathnames.login,
    element: <LoginPage />,
  },
  {
    path: pathnames.register,
    element: <RegisterPage />,
  },
];
