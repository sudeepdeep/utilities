import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import UtilitiesPage from "./components/UtilitiesPage";
import TermsPage from "./components/TermsPage";
import PrivacyPolicyPage from "./components/Privacy";
import AboutPage from "./components/About";
import CheckoutPage from "./components/CheckoutPage";
import { SEO } from "./components/SEO";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Type-safe wrapper for GoogleOAuthProvider
const GoogleOAuthProviderWrapper = GoogleOAuthProvider as React.ComponentType<{
  clientId: string;
  children: React.ReactNode;
}>;

const clientId = import.meta.env.VITE_CLIENT_ID ?? "";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProviderWrapper clientId={clientId}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SEO
                  title="Free JavaScript Utilities & Code Snippets"
                  description="Discover free JavaScript utilities, code snippets, and developer tools. Password generators, converters, validators, form templates and more."
                  keywords="javascript utilities, code snippets, developer tools, password generator, converters, javascript code snippets, javascript utilities online, free javascript tools, copy paste javascript code, developer tools, javascript helper functions"
                  url="/"
                />
                <App />
              </>
            }
          />
          <Route path="/utilities" element={<UtilitiesPage />} />
          <Route
            path="/utilities/category/:categoryId"
            element={<UtilitiesPage />}
          />
          <Route
            path="/utilities/category/:categoryId/tools/:toolId"
            element={<UtilitiesPage />}
          />
          <Route path="/checkout/:toolId" element={<CheckoutPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProviderWrapper>
  </React.StrictMode>
);
