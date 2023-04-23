import { lazy } from "react";
import { pathnames } from "@utils";
import { Outlet, Route, Routes } from "react-router-dom";
import { authRoutes } from "./auth.routes";

const LandingPage = lazy(() => import("@pages/landing.page"));

const publicRoutes = authRoutes;

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path={pathnames.root} element={<LandingPage />}>
        {publicRoutes.map((route, index) => {
          return <Route key={index} {...route} />;
        })}
      </Route>
    </Routes>
  );
};
