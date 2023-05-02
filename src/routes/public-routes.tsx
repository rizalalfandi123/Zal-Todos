import { RouteApp } from '@interfaces';
import { pathnames } from '@utils';
import { lazy, Suspense } from 'react';
import { SuspenseFallback } from './suspense-fallback';
import { Outlet, Route, Routes } from 'react-router-dom';

const LoginPage = lazy(() => import('@pages/login.page'));
const RegisterPage = lazy(() => import('@pages/register.page'));
const RootPage = lazy(() => import('@pages/root.page'));

export const PublicRoutes = () => {
 return (
  <Routes>
   <Route
    path={pathnames.root}
    element={
     <Suspense fallback={<SuspenseFallback />}>
      <Outlet />
     </Suspense>
    }
   >
    <Route
     path={pathnames.login}
     element={
      <Suspense fallback={<SuspenseFallback />}>
       <LoginPage />
      </Suspense>
     }
    />

    <Route
     path={pathnames.register}
     element={
      <Suspense fallback={<SuspenseFallback />}>
       <RegisterPage />
      </Suspense>
     }
    />
   </Route>
  </Routes>
 );
};
