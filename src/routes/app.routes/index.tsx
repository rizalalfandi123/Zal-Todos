import type { RouteApp } from '@interfaces';

import { lazy } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { pathnames, useSession } from '@utils';
import { appRoutes } from './app.routes';

const NavigationBarPage = lazy(() => import('@pages/navigation-bar.page'));

const privateRoutes: RouteApp[] = appRoutes;

export const AppRoutes = () => {
 const { data: session, isLoading: isLoadingGetSession } = useSession();

 const location = useLocation();

 // TODO: Redirect to login when no session
 if (!session && !isLoadingGetSession && location.pathname !== pathnames.login) {
  return <Navigate to={pathnames.login} />;
 }

 // TODO: Redirect when visit /app
 if (location.pathname === pathnames.app) {
  return <Navigate to={pathnames.inbox} />;
 }

 return (
  <Routes>
   <Route path={pathnames.app} element={<NavigationBarPage />}>
    {privateRoutes.map((route, indexMap) => {
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
