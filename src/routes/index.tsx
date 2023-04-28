import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './app.routes';
import { PublicRoutes } from './public.routes';

const AllRoutes = () => {
 return (
  <BrowserRouter>
   <Suspense fallback={<div>Loading</div>}>
    <PublicRoutes />
    <AppRoutes />
   </Suspense>
  </BrowserRouter>
 );
};

export default AllRoutes;
