import { Outlet } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      Landing Page
      <Outlet />
    </div>
  );
};

export default LandingPage;
