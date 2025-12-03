// src/pages/GraphPage.jsx
import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function GraphPage(){
  const [data, setData] = useState([]);

  useEffect(()=>{
    (async()=>{
      // For now, compute simple daily totals from history on client
      const res = await API.get("/wallet/history");
      const txns = res.data.transactions;
      // map to date totals
      const map = {};
      txns.forEach(t=>{
        const d = new Date(t.createdAt).toLocaleDateString();
        map[d] = (map[d] || 0) + t.amount * (t.type === "SEND" ? -1 : 1);
      });
      const chart = Object.keys(map).slice(0,30).map(k=>({ date: k, amount: map[k] }));
      setData(chart.reverse());
    })();
  },[]);

  return (
    <div style={{ width:"100%", height: 400 }}>
      <h2>Transaction Graph</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
