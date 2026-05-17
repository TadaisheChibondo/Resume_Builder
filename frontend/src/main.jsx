import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// 1. Import the Vercel Analytics component
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />

    {/* 2. Drop it right below your App component */}
    <Analytics />
  </StrictMode>,
);
