import type { RoutePath } from "@utils";
import type { PathRouteProps } from "react-router-dom";

export interface RouteApp extends Omit<PathRouteProps, "path"> {
  path: RoutePath;
}
