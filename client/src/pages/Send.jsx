import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Send() {
  const nav = useNavigate();
  const [balance, setBalance] = useState(0);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const quickUsers = [
    { name: "Sarah M.", email: "sarah@example.com", letter: "S" },
    { name: "Michael K.", email: "michael@example.com", letter: "M" },
    { name: "Emma T.", email: "emma@example.com", letter: "E" },
  ];

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/wallet/balance");
        setBalance(res.data.balance);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleSend = async (e) => {
  e.preventDefault();

  try {
    await API.post("/wallet/send", {
      email: recipient,  // FIXED: backend expects "email"
      amount: Number(amount),
    });

    setMessage("Money sent successfully!");
    setTimeout(() => nav("/dashboard"), 1200);

  } catch (err) {
    setMessage(err.response?.data?.message || "Failed to send money");
  }
};


  return (
    <div className="p-4" style={{ maxWidth: 900, margin: "0 auto" }}>

      {/* BACK BUTTON */}
      <div className="d-flex align-items-center mb-3" style={{ cursor: "pointer" }} onClick={() => nav(-1)}>
        <span style={{ fontSize: 22, marginRight: 8 }}>←</span>
        <h5 className="m-0">Send Money</h5>
      </div>

      {/* BALANCE CARD */}
      <div className="send-balance-card mb-4">
        <p className="mb-1 text-muted fw-semibold">Available Balance</p>
        <h2 className="fw-bold">${balance.toFixed(2)}</h2>
      </div>

      {/* QUICK SEND */}
      <h5 className="fw-semibold mb-3">Quick Send</h5>

      <div className="d-flex mb-4">
        {quickUsers.map((u) => (
          <div key={u.email} className="text-center me-4" onClick={() => setRecipient(u.email)}>
            <div className="quick-user">{u.letter}</div>
            <div className="small mt-2">{u.name}</div>
          </div>
        ))}
      </div>

      {/* SEND FORM */}
      <div className="send-box">
        <Form onSubmit={handleSend}>
          
          {/* Recipient */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Recipient Email or ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email or SmartPay ID"
              className="rounded-3"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </Form.Group>

          {/* Amount */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              className="rounded-3"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </Form.Group>

          {/* SEND BUTTON */}
          <button type="submit" className="btn-sendmoney">
            Send Money
          </button>
        </Form>

        {message && (
          <p className="text-center mt-3 fw-semibold text-success">{message}</p>
        )}
      </div>
    </div>
  );
}
