import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutesInvestor = () => {
  let role = localStorage.getItem("role");
  return role === "Investor" ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutesInvestor;
