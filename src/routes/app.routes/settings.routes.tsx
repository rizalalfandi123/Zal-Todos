import { RouteApp } from '@interfaces';
import { pathnames } from '@utils';
import { lazy, Suspense } from 'react';
import { LoadingFallback } from '../suspense-fallback';

const SettingsPage = lazy(() => import('@pages/settings.page'));

export const settingsRoutes: RouteApp[] = [
 {
  path: pathnames.settings,

  element: (
   <Suspense fallback={<LoadingFallback />}>
    <SettingsPage />
   </Suspense>
  ),

  isModal: true,
 },
];
