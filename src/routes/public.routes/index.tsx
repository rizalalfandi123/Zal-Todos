import type { RouteApp } from '@interfaces';

import { lazy } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { pathnames } from '@utils';
import { authRoutes } from './auth.routes';

const RootPage = lazy(() => import('@pages/root.page'));

const publicRoutes: RouteApp[] = [{ index: true, element: <RootPage />, path: pathnames.root }, ...authRoutes];

export const PublicRoutes = () => {
 return (
  <Routes>
   <Route path={pathnames.root} element={<Outlet />}>
    {publicRoutes.map((route, indexMap) => {
     const { index, children, ...routeProps } = route;

     // TODO: For layout route
     if (index && children === undefined) {
      return <Route key={indexMap} index={true} children={undefined} {...routeProps} />;
     }

     return <Route key={indexMap} {...routeProps} />;
    })}
   </Route>
  </Routes>
 );
};
