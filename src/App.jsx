
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import SelectRole from "./pages/SelectRole";
import FarmerAuth from "./pages/FarmerAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/SelectRole" element={<SelectRole />} />

        <Route path="/farmer/login" element={<FarmerAuth />} />
        <Route path="/farmer/signup" element={<FarmerAuth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
