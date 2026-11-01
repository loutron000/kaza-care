import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import SelectRole from "./pages/SelectRole";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/SelectRole" element={<SelectRole />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;