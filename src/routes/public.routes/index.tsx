import type { RouteApp } from '@interfaces';

import { lazy } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { pathnames } from '@utils';
import { authRoutes } from './auth.routes';

const RootPage = lazy(() => import('@pages/root.page'));

const publicRoutes: RouteApp[] = [...authRoutes];

export const PublicRoutes = () => {
 return (
  <Routes>
   <Route path={pathnames.root} element={<Outlet />}>
    <Route index element={<RootPage />} />

    {publicRoutes.map((route, indexMap) => {
     return <Route key={indexMap} {...route} />;
    })}
   </Route>
  </Routes>
 );
};
