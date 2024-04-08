import Home from "../pages/home";
import SignUp from "../pages/Register";
import SignIn from "../pages/SignIn";
import ReactDOM from "react-dom/client";
import Investor from "../pages/Investor";
import Fundraiser from "../pages/fundraiser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App(){
    return (
        <BrowserRouter>
          <Routes>
              <Route index element={<Home />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/investor" element={<Investor />} />
              <Route path="/fundraiser" element={<Fundraiser />} />
          </Routes>
        </BrowserRouter>
      );
}

export default App;