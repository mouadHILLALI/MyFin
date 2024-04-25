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
import PrivateRoutesAdmin from "../components/routes/privateroutesadmin";
import PrivateRoutesInvestor from "../components/routes/privateroutesinvestor";
import PrivateRoutesFundraiser from "../components/routes/privateroutesfund";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutesAdmin />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/manage" element={<ManageRequests />} />
        </Route>
        <Route element={<PrivateRoutesInvestor />}>
          <Route path="/investor" element={<Investor />} />
          <Route path="/investorprofile" element={<InvestorProfile />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/donate" element={<Donate />} />
        </Route>

        <Route element={<PrivateRoutesFundraiser />}>
          <Route path="/fundraiser" element={<Fundraiser />} />
          <Route path="/fundraiserprofile" element={<FundRaiserProfile />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
