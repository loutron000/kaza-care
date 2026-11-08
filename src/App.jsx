
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";
import SelectRole from "./pages/SelectRole";
import FarmerAuth from "./pages/FarmerAuth";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/SelectRole" element={<SelectRole />} />

          <Route path="/farmer/login" element={<FarmerAuth />} />
          <Route path="/farmer/signup" element={<FarmerAuth />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
