import { pathnames, supabase, useSession, useWebTitle } from '@utils';
import { Link, Outlet } from 'react-router-dom';

export const TodayPage = () => {
 useWebTitle('Today');

 return <div>Today</div>;
};

export default TodayPage;
