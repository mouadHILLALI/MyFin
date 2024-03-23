import Home from "../pages/home";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App(){
    return (
        <BrowserRouter>
          <Routes>
              <Route index element={<Home />} />
          </Routes>
        </BrowserRouter>
      );
}

export default App;