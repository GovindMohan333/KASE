import React from "react";

export default function TransactionCard({ t }) {
  const type = t.type?.toUpperCase() || "";

  const getIcon = () => {
    if (type === "RECEIVE") {
      return { icon: "↙", bg: "#dcfce7", color: "#16a34a" };
    }
    if (type === "SEND") {
      return { icon: "↗", bg: "#fee2e2", color: "#dc2626" };
    }
    if (type === "TOPUP") {
      return { icon: "+", bg: "#dbeafe", color: "#2563eb" };
    }
    return { icon: "?", bg: "#e5e7eb", color: "#6b7280" };
  };

  const { icon, bg, color } = getIcon();

  const formatDate = (ts) => {
    return new Date(ts).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div
      className="d-flex align-items-center justify-content-between p-3 mb-3 bg-white"
      style={{
        borderRadius: 20,
        boxShadow: "0 8px 25px rgba(0,0,0,0.06)"
      }}
    >
      {/* ICON */}
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          background: bg,
          color: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          fontWeight: "bold",
          marginRight: 15
        }}
      >
        {icon}
      </div>

      {/* DESCRIPTION */}
      <div style={{ flex: 1 }}>
        <div className="fw-semibold">{t.description}</div>

        {t.email && (
          <div className="text-muted small">{t.email}</div>
        )}

        <div className="text-muted small">{formatDate(t.createdAt)}</div>
      </div>

      {/* AMOUNT */}
      <div
        className="fw-bold"
        style={{
          color:
            type === "SEND"
              ? "#dc2626"
              : type === "RECEIVE"
              ? "#16a34a"
              : "#2563eb"
        }}
      >
        {type === "SEND" ? "-" : "+"}${Number(t.amount).toFixed(2)}
      </div>
    </div>
  );
}
