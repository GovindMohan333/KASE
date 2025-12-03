import React from "react";
import { Link } from "react-router-dom";

export default function NavbarBoot() {
  return (
    <nav
      className="d-flex justify-content-between align-items-center px-4 py-3 shadow-sm bg-white"
      style={{ borderRadius: "0 0 20px 20px" }}
    >
      <div className="d-flex align-items-center gap-2">
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "linear-gradient(45deg, #6366F1, #A855F7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          S
        </div>
        <span className="fw-semibold">SmartPay</span>
      </div>

      <div className="d-flex align-items-center gap-4">
        <Link to="/profile" style={{ fontSize: 20 }}>
          👤
        </Link>
        <Link to="/logout" style={{ fontSize: 20 }}>
          ↺
        </Link>
      </div>
    </nav>
  );
}
