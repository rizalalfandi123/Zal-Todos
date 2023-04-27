import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PrivateRoutes } from './private.routes';
import { PublicRoutes } from './public.routes';

const AppRoutes = () => {
 return (
  <BrowserRouter>
   <Suspense fallback={<div>Loading</div>}>
    <PublicRoutes />
    <PrivateRoutes />
   </Suspense>
  </BrowserRouter>
 );
};

export default AppRoutes;
