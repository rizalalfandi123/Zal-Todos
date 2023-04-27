import type { RouteApp } from '@interfaces';

import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { pathnames } from '@utils';

const NavigationBarPage = lazy(() => import('@pages/navigation-bar.page'));

const privateRoutes: RouteApp[] = [];

export const PrivateRoutes = () => {
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
