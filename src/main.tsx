import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import UtilitiesPage from "./components/UtilitiesPage";
import TermsPage from "./components/TermsPage";
import PrivacyPolicyPage from "./components/Privacy";
import AboutPage from "./components/About";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/utilities" element={<UtilitiesPage />} />
        <Route path="/utilities/:toolId" element={<UtilitiesPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
