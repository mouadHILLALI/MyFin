import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutesFundraiser = () => {
  let role = localStorage.getItem("role");
  return role === "FundRaiser" ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutesFundraiser;
