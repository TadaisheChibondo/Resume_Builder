import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import BuilderPage from "./pages/BuilderPage";
// SuccessPage and LandingPage can be stubbed out or added as routes later

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page Route - For now, we redirect straight to the builder */}
        <Route path="/" element={<Navigate to="/builder" replace />} />

        {/* The Main App Workspace */}
        <Route path="/builder" element={<BuilderPage />} />

        {/* Fallback route to catch 404s and send them back to the workspace */}
        <Route path="*" element={<Navigate to="/builder" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
