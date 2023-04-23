import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { PublicRoutes } from "./public.routes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading</div>}>
        <PublicRoutes />
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
