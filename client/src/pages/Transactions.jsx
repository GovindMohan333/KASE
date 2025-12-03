import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Transactions() {
  const nav = useNavigate();

  const [txns, setTxns] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    (async () => {
      const res = await API.get("/wallet/history");
      setTxns(res.data.transactions);
    })();
  }, []);

  const filteredTxns = txns.filter((t) => {
    if (filter === "all") return true;
    if (filter === "sent") return t.type === "SEND";
    if (filter === "received") return t.type === "RECEIVE";
    if (filter === "topup") return t.type === "TOPUP";
    return true;
  });

  const formatDate = (ts) => {
    return new Date(ts).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getIcon = (type) => {
    if (type === "SEND") return { icon: "↗", cls: "txn-red" };
    if (type === "RECEIVE") return { icon: "↙", cls: "txn-green" };
    if (type === "TOPUP") return { icon: "+", cls: "txn-blue" };
  };

  const getAmountStyle = (type) => {
    if (type === "SEND") return "txn-amount-red";
    if (type === "RECEIVE") return "txn-amount-green";
    if (type === "TOPUP") return "txn-amount-blue";
  };

  return (
    <div className="p-4" style={{ maxWidth: 900, margin: "0 auto" }}>

      {/* BACK BUTTON */}
      <div className="d-flex align-items-center mb-3" style={{ cursor: "pointer" }} onClick={() => nav(-1)}>
        <span style={{ fontSize: 22, marginRight: 8 }}>←</span>
        <h5 className="m-0">Transactions</h5>
      </div>

      {/* FILTER BUTTONS */}
      <div className="d-flex gap-3 mb-4">
        <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
          All
        </button>

        <button className={`filter-btn ${filter === "sent" ? "active" : ""}`} onClick={() => setFilter("sent")}>
          Sent
        </button>

        <button className={`filter-btn ${filter === "received" ? "active" : ""}`} onClick={() => setFilter("received")}>
          Received
        </button>

        <button className={`filter-btn ${filter === "topup" ? "active" : ""}`} onClick={() => setFilter("topup")}>
          Top-up
        </button>
      </div>

      {/* TRANSACTION LIST */}
      {filteredTxns.map((t) => {
        const { icon, cls } = getIcon(t.type);

        return (
          <div key={t._id} className="txn-card">

            {/* ICON */}
            <div className={`txn-icon ${cls}`}>{icon}</div>

            {/* DETAILS */}
            <div style={{ flex: 1 }}>
              <div className="fw-semibold">
                {t.description || (t.type === "SEND" ? "Sent to user" : t.type === "RECEIVE" ? "Payment received" : "Added money")}
              </div>

              {t.to && <div className="text-muted small">{t.to.email}</div>}
              {t.from && <div className="text-muted small">{t.from.email}</div>}

              <div className="text-muted small">{formatDate(t.createdAt)}</div>
            </div>

            {/* AMOUNT */}
            <div className={`fw-bold ${getAmountStyle(t.type)}`}>
              {(t.type === "SEND" ? "-" : "+")}${t.amount.toFixed(2)}
            </div>

          </div>
        );
      })}
    </div>
  );
}
