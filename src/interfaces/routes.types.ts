import type { RoutePath } from '@utils';
import type { PathRouteProps } from 'react-router-dom';

export interface RouteApp extends Omit<PathRouteProps, 'path' | 'children'> {
 path: RoutePath;
 isModal?: boolean;
 children?: RouteApp[];
}
