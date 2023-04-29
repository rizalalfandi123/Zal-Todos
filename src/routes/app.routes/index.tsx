import type { RouteApp } from '@interfaces';

import { lazy, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';

import { pathnames, useSession } from '@utils';
import { appRoutes } from './app.routes';
import { LoadingFallback } from '../suspense-fallback';
import { settingsRoutes } from './settings.routes';

const NavigationBarPage = lazy(() => import('@pages/navigation-bar.page'));

const privateRoutes: RouteApp[] = appRoutes.concat(settingsRoutes);

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
  <>
   <Routes location={location.state?.backgroundLocation || location}>
    <Route
     path={pathnames.app}
     element={
      <Suspense fallback={<LoadingFallback />}>
       <NavigationBarPage />
      </Suspense>
     }
    >
     {privateRoutes
      .filter((route) => !route.isModal)
      .map((route, indexMap) => {
       return <Route key={indexMap} {...route} />;
      })}
    </Route>
   </Routes>

   {location.state?.backgroundLocation && (
    <Routes>
     {privateRoutes
      .filter((route) => route.isModal)
      .map((route, indexMap) => {
       return <Route key={indexMap} {...route} />;
      })}
    </Routes>
   )}
  </>
 );
};
