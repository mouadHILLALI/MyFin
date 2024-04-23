import Home from "../pages/home";
import SignUp from "../pages/Register";
import SignIn from "../pages/SignIn";
import Investor from "../pages/Investor";
import Fundraiser from "../pages/fundraiser";
import { FundRaiserProfile } from "../pages/fundraiserprofile";
import { InvestorProfile } from "../pages/investorprofile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Portfolio } from "../pages/portfolio";
import { Admin } from "../pages/admin";
import { ManageRequests } from "../pages/managerequests";
import { Donate } from "../components/donate";
import { ErrorPage } from "../pages/errorPage";

function App() {
  const role = localStorage.getItem("role");

  const investorRoutes = (
    <>
      <Route path="/investor" element={<Investor />} />
      <Route path="/investorprofile" element={<InvestorProfile />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/donate" element={<Donate />} />
    </>
  );

  const fundraiserRoutes = (
    <>
      <Route path="/fundraiser" element={<Fundraiser />} />
      <Route path="/fundraiserprofile" element={<FundRaiserProfile />} />
    </>
  );

  const adminRoutes = (
    <>
      <Route path="/admin" element={<Admin />} />
      <Route path="/manage" element={<ManageRequests />} />
    </>
  );

  const userRoutes = (
    <>
      <Route path="/register" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </>
  );

  return (
    <BrowserRouter>
      <Routes>
        {role === "Investor" ? investorRoutes : null}
        {role === "Admin" ? adminRoutes : null}
        {role === "FundRaiser" ? fundraiserRoutes : null}
        {!role && userRoutes}
        <Route index element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
