import React from "react";
import ReactDOM from "react-dom/client";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import App from "./components/App";
import ErrorBoundary from "./components/ErrorBoundary";
import "./styles/index.scss";

// Font Awesome otherwise injects a <style> tag at runtime, which the CSP's style-src 'self'
// blocks; its CSS is bundled by the import above instead.
config.autoAddCss = false;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
