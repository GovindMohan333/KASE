import React from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/topbar.css";

export default function TopBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="topbar-container">

      {/* LEFT - SmartPay Logo */}
      <div className="topbar-left">
        <div className="logo-circle">S</div>
        <h5 className="smartpay-text">SmartPay</h5>
      </div>

      {/* RIGHT - Profile → Greeting → Logout */}
      <div className="topbar-right">
        <i className="bi bi-person-fill profile-icon"></i>

        <span className="greeting-text">
          Hello, <strong>{user?.name || "User"}</strong>
        </span>

        <i
          className="bi bi-box-arrow-right logout-icon"
          onClick={handleLogout}
        ></i>
      </div>
    </div>
  );
}
