import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
// Stylesheet
import "./index.css";
// Imported components
import App from "./components/app";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
