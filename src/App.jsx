import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";
import SelectRole from "./pages/SelectRole";
import FarmerAuth from "./pages/FarmerAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import SymptomChecker from "./pages/SymptomChecker";
import FindVet from "./pages/FindVet";
import QuickFarmLog from "./pages/QuickFarmLog";
import FarmRecords from "./pages/FarmRecords";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/SelectRole" element={<SelectRole />} />

          <Route path="/farmer/login" element={<FarmerAuth />} />
          <Route path="/farmer/signup" element={<FarmerAuth />} />

          <Route
            path="/farmer/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/farmer/assessment"
            element={
              <ProtectedRoute>
                <SymptomChecker />
              </ProtectedRoute>
            }
          />

          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <FindVet />
              </ProtectedRoute>
            }
          />

          <Route
            path="/farmer/quick-log"
            element={
              <ProtectedRoute>
                <QuickFarmLog />
              </ProtectedRoute>
            }
          />

          <Route
            path="/farmer/records"
            element={
              <ProtectedRoute>
                <FarmRecords />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
