// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";
import "./styles/index.css";
import "./styles/auth.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/addmoney.css";
import "./styles/dashboard.css";
import "./styles/sendmoney.css";
import "./styles/transactions.css";
import "./styles/analytics.css";
import "bootstrap-icons/font/bootstrap-icons.css";








ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
