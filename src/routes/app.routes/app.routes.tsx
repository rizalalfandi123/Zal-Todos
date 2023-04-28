import { RouteApp } from '@interfaces';
import { pathnames } from '@utils';
import { lazy } from 'react';

const InboxPage = lazy(() => import('@pages/inbox.page'));
const UpcomingPage = lazy(() => import('@pages/upcoming.page'));
const TodayPage = lazy(() => import('@pages/today.page'));

export const appRoutes: RouteApp[] = [
 {
  path: pathnames.inbox,
  element: <InboxPage />,
 },
 {
  path: pathnames.upcoming,
  element: <UpcomingPage />,
 },
 {
  path: pathnames.today,
  element: <TodayPage />,
 },
];
