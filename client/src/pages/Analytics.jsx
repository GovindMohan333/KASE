import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  const nav = useNavigate();

  const [totals, setTotals] = useState({
    sent: 0,
    received: 0,
    topup: 0,
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/wallet/analytics");

        setTotals({
          sent: res.data.totalSent,
          received: res.data.totalReceived,
          topup: res.data.totalTopups,
        });

        setChartData(res.data.chart);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="p-4" style={{ maxWidth: 1100, margin: "0 auto" }}>
      {/* BACK BUTTON */}
      <div
        className="d-flex align-items-center mb-4"
        style={{ cursor: "pointer" }}
        onClick={() => nav(-1)}
      >
        <span style={{ fontSize: 22, marginRight: 8 }}>←</span>
        <h5 className="m-0">Analytics</h5>
      </div>

      {/* SUMMARY CARDS */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="analytics-card">
            <div className="analytics-icon icon-red">↗</div>
            <div>
              <div className="text-muted small">Total Sent</div>
              <h4 className="fw-bold text-danger">${totals.sent.toFixed(2)}</h4>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="analytics-card">
            <div className="analytics-icon icon-green">↙</div>
            <div>
              <div className="text-muted small">Total Received</div>
              <h4 className="fw-bold text-success">${totals.received.toFixed(2)}</h4>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="analytics-card">
            <div className="analytics-icon icon-blue">💳</div>
            <div>
              <div className="text-muted small">Total Top-ups</div>
              <h4 className="fw-bold" style={{ color: "#2563eb" }}>
                ${totals.topup.toFixed(2)}
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* INCOME vs EXPENSE CHART */}
      <div className="analytics-chart-box">
        <h5 className="fw-semibold mb-3">Income vs Expense</h5>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />

            {/* RECEIVED LINE */}
            <Line
              type="monotone"
              dataKey="received"
              stroke="#16a34a"
              strokeWidth={3}
              dot={{ r: 5 }}
            />

            {/* SENT LINE */}
            <Line
              type="monotone"
              dataKey="sent"
              stroke="#dc2626"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
