import { pathnames } from "@utils";
import { Link, Outlet } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      Landing Page
      <Link to={pathnames.login} >Login</Link>
      <Outlet />
    </div>
  );
};

export default LandingPage;
