import { pathnames, useSession } from '@utils';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { SuspenseFallback } from './suspense-fallback';

const NavigationBarPage = lazy(() => import('@pages/navigation-bar.page'));
const InboxPage = lazy(() => import('@pages/inbox.page'));
const UpcomingPage = lazy(() => import('@pages/upcoming.page'));
const TodayPage = lazy(() => import('@pages/today.page'));
const SettingsPage = lazy(() => import('@pages/settings.page'));
const AcccountSettingsPage = lazy(() => import('@pages/account-settings.page'));
const ThemeSettingsPage = lazy(() => import('@pages/theme-settings.page'));
const GeneralSettingsPage = lazy(() => import('@pages/general-settings.page'));
const SidebarSettingsPage = lazy(() => import('@pages/sidebar-settings.page'));

export const PrivateRoutes = () => {
 const location = useLocation();

 const { data: session, isLoading: isLoadingSession } = useSession();

 if (!session && !isLoadingSession && location.pathname !== pathnames.login) {
  return <Navigate to={pathnames.login} />;
 }

 return (
  <Routes>
   <Route
    path={pathnames.app}
    element={
     <Suspense fallback={<SuspenseFallback />}>
      <NavigationBarPage />
     </Suspense>
    }
   >
    <Route
     path={pathnames.inbox}
     element={
      <Suspense fallback={<SuspenseFallback />}>
       <InboxPage />
      </Suspense>
     }
    />

    <Route
     path={pathnames.upcoming}
     element={
      <Suspense fallback={<SuspenseFallback />}>
       <UpcomingPage />
      </Suspense>
     }
    />

    <Route
     path={pathnames.today}
     element={
      <Suspense fallback={<SuspenseFallback />}>
       <TodayPage />
      </Suspense>
     }
    />

    <Route
     path={pathnames.settings}
     element={
      <Suspense fallback={<SuspenseFallback />}>
       <SettingsPage />
      </Suspense>
     }
    >
     <Route
      index
      element={
       <Suspense fallback={<SuspenseFallback />}>
        <AcccountSettingsPage />
       </Suspense>
      }
     />

     <Route
      path={pathnames.generalSettings}
      element={
       <Suspense fallback={<SuspenseFallback />}>
        <GeneralSettingsPage />
       </Suspense>
      }
     />

     <Route
      path={pathnames.themeSettings}
      element={
       <Suspense fallback={<SuspenseFallback />}>
        <ThemeSettingsPage />
       </Suspense>
      }
     />

     <Route
      path={pathnames.sidebarSettings}
      element={
       <Suspense fallback={<SuspenseFallback />}>
        <SidebarSettingsPage />
       </Suspense>
      }
     />
    </Route>
   </Route>
  </Routes>
 );
};
