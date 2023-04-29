import { Suspense, useEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { AppRoutes } from './app.routes';
import { PublicRoutes } from './public.routes';

const AllRoutes = () => {
 return (
  <BrowserRouter>
    <AppRoutes />
    <PublicRoutes />
  </BrowserRouter>
 );
};

export default AllRoutes;
