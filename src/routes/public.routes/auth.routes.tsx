import { RouteApp } from '@interfaces';
import { pathnames } from '@utils';
import { lazy, Suspense } from 'react';
import { LoadingFallback } from '../suspense-fallback';

const LoginPage = lazy(() => import('@pages/login.page'));
const RegisterPage = lazy(() => import('@pages/register.page'));

export const authRoutes: RouteApp[] = [
 {
  path: pathnames.login,
  element: (
   <Suspense fallback={<LoadingFallback />}>
    <LoginPage />
   </Suspense>
  ),
 },
 {
  path: pathnames.register,
  element: (
   <Suspense fallback={<LoadingFallback />}>
    <RegisterPage />
   </Suspense>
  ),
 },
];
