import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function TopUp() {
  const nav = useNavigate();
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [message, setMessage] = useState("");
  const [paymentSource, setPaymentSource] = useState("");


  const presets = [50, 100, 200, 500];

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

  const handlePreset = (value) => {
    setAmount(value);
    setSelectedPreset(value);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!paymentSource) {
    setMessage("Please select a payment source");
    return;
  }

  try {
    const res = await API.post("/wallet/topup", {
      amount: Number(amount),
      paymentSource,
    });

    setMessage("Money added successfully!");
    setTimeout(() => nav("/dashboard"), 1000);
  } catch (err) {
    setMessage(err.response?.data?.message || "Failed to add money");
  }
};

  return (
    <div className="p-4" style={{ maxWidth: 900, margin: "0 auto" }}>

      {/* BACK BUTTON + TITLE */}
      <div className="d-flex align-items-center mb-3" style={{ cursor: "pointer" }} onClick={() => nav(-1)}>
        <span style={{ fontSize: 22, marginRight: 8 }}>←</span>
        <h5 className="m-0">Add Money</h5>
      </div>

      {/* BALANCE CARD */}
      <div className="addmoney-balance-card mb-4">
        <p className="mb-1 opacity-75">Current Balance</p>
        <h1 className="fw-bold">${balance.toFixed(2)}</h1>
      </div>

      {/* WHITE BOX FORM */}
      <div className="addmoney-box">

        {/* Amount */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              className="rounded-3"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setSelectedPreset(null);
              }}
              required
            />
          </Form.Group>

          {/* PRESETS */}
          <div className="d-flex flex-wrap mb-3">
            {presets.map((p) => (
              <div
                key={p}
                className={
                  "amount-option " + (selectedPreset === p ? "active" : "")
                }
                onClick={() => handlePreset(p)}
              >
                ${p}
              </div>
            ))}
          </div>

          {/* PAYMENT SOURCE */}
          <Form.Group className="mb-4">
  <Form.Label className="fw-semibold">Payment Source</Form.Label>
  <Form.Select 
    className="rounded-3"
    value={paymentSource}
    onChange={(e) => setPaymentSource(e.target.value)}
    required
  >
    <option value="">Select payment source</option>
    <option value="bank">Bank Account</option>
    <option value="credit">Credit Card</option>
    <option value="debit">Debit Card</option>
  </Form.Select>
</Form.Group>


          {/* SUBMIT */}
          <button type="submit" className="btn-addmoney">
            Add Money
          </button>
        </Form>

        {message && (
          <p className="text-center mt-3 fw-semibold text-success">{message}</p>
        )}
      </div>
    </div>
  );
}
