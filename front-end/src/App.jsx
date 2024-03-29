import Home from "../pages/home";
import SignUp from "../pages/Register";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App(){
    return (
        <BrowserRouter>
          <Routes>
              <Route index element={<Home />} />
              <Route path="/register" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      );
}

export default App;