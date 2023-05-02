import { Suspense, useEffect, useRef } from 'react';
import { BrowserRouter, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { createBrowserHistory } from 'history';
import { PrivateRoutes } from './private-routes';
import { PublicRoutes } from './public-routes';

export const history = createBrowserHistory({ window });

const AllRoutes = () => {
 return (
  <HistoryRouter history={history as any}>
   <PublicRoutes />
   <PrivateRoutes />
  </HistoryRouter>
 );
};

export default AllRoutes;
