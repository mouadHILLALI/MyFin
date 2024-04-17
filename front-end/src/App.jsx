import Home from "../pages/home";
import SignUp from "../pages/Register";
import SignIn from "../pages/SignIn";
import ReactDOM from "react-dom/client";
import Investor from "../pages/Investor";
import Fundraiser from "../pages/fundraiser";
import { FundRaiserProfile } from "../pages/fundraiserprofile";
import { InvestorProfile } from "../pages/investorprofile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Portfolio } from "../pages/portfolio";
import { Admin } from "../pages/admin";
function App(){
    return (
        <BrowserRouter>
          <Routes>
              <Route index element={<Home />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/investor" element={<Investor />} />
              <Route path="/investorprofile" element={<InvestorProfile />} />
              <Route path="/fundraiser" element={<Fundraiser />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/fundraiserprofile" element={<FundRaiserProfile />} />
              <Route path="/admin" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      );
}

export default App;