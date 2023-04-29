import { RouteApp } from '@interfaces';
import { pathnames } from '@utils';
import { lazy, Suspense } from 'react';
import { LoadingFallback } from '../suspense-fallback';

const InboxPage = lazy(() => import('@pages/inbox.page'));
const UpcomingPage = lazy(() => import('@pages/upcoming.page'));
const TodayPage = lazy(() => import('@pages/today.page'));

export const appRoutes: RouteApp[] = [
 {
  path: pathnames.inbox,

  element: (
   <Suspense fallback={<LoadingFallback />}>
    <InboxPage />
   </Suspense>
  ),
 },

 {
  path: pathnames.upcoming,
  element: (
   <Suspense fallback={<LoadingFallback />}>
    <UpcomingPage />
   </Suspense>
  ),
 },

 {
  path: pathnames.today,
  element: (
   <Suspense fallback={<LoadingFallback />}>
    <TodayPage />
   </Suspense>
  ),
 },
];
