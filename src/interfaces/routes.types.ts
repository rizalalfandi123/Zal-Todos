import type { RoutePath } from '@utils';
import type { RouteProps } from 'react-router-dom';

export interface RouteApp extends Omit<RouteProps, 'path'> {
 path: RoutePath;
}
