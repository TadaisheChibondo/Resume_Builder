import React, { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage"; // Adjust this path if you saved it somewhere else
import BuilderPage from "./pages/BuilderPage";

function App() {
  // Check if they were already building a CV so we don't force them
  // to look at the landing page every time they refresh
  const [showBuilder, setShowBuilder] = useState(() => {
    return localStorage.getItem("resumeStep") !== null;
  });

  const handleStartBuilding = () => {
    setShowBuilder(true);
    // Give them a fresh start if they click the button, unless they already have data
    if (!localStorage.getItem("resumeStep")) {
      localStorage.setItem("resumeStep", "1");
    }
  };

  return (
    <div className="App">
      {showBuilder ? (
        <BuilderPage />
      ) : (
        <LandingPage onGetStarted={handleStartBuilding} />
      )}
    </div>
  );
}

export default App;
