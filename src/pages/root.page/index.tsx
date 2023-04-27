import { pathnames, supabase, useSession } from '@utils';
import { Link, Outlet } from 'react-router-dom';

const RootPage = () => {
 const { data } = useSession();

 return <div>{JSON.stringify(data)}</div>;
};

export default RootPage;
