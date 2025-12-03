import React, { useEffect, useState } from "react";
import API from "../api/axios";

import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import TransactionCard from "../components/TransactionCard";
import TopBar from "../components/TopBar";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [txns, setTxns] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const bal = await API.get("/wallet/balance");
        setBalance(bal.data.balance);

        const history = await API.get("/wallet/history");
        setTxns(history.data.transactions.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <>
      {/* FIXED — USE TOPBAR */}
      <TopBar />

      <Container className="mt-4">

        {/* BALANCE CARD */}
        <div className="balance-card mb-5">
          <h6 className="opacity-75">Total Balance</h6>
          <h1 className="fw-bold">${balance.toFixed(2)}</h1>

          <div className="d-flex mt-3 gap-3">
            <Link to="/topup">
              <button className="balance-btn">
                <span className="me-1">＋</span> Add Money
              </button>
            </Link>

            <Link to="/send">
              <button className="balance-btn" style={{ color: "#555" }}>
                Send
              </button>
            </Link>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <h5 className="fw-semibold mb-3">Quick Actions</h5>

        <Row className="mb-5">
          <Col md={3} sm={6} className="mb-3">
            <Link to="/topup" className="text-decoration-none text-dark">
              <div className="action-card">
                <div className="action-icon icon-blue">＋</div>
                Add Money
              </div>
            </Link>
          </Col>

          <Col md={3} sm={6} className="mb-3">
            <Link to="/send" className="text-decoration-none text-dark">
              <div className="action-card">
                <div className="action-icon icon-purple">↗</div>
                Send Money
              </div>
            </Link>
          </Col>

          <Col md={3} sm={6} className="mb-3">
            <Link to="/transactions" className="text-decoration-none text-dark">
              <div className="action-card">
                <div className="action-icon icon-purple">↙</div>
                Transactions
              </div>
            </Link>
          </Col>

          <Col md={3} sm={6} className="mb-3">
            <Link to="/graph" className="text-decoration-none text-dark">
              <div className="action-card">
                <div className="action-icon icon-green">📈</div>
                Analytics
              </div>
            </Link>
          </Col>
        </Row>

        {/* RECENT TRANSACTIONS */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-semibold">Recent Transactions</h5>
          <Link to="/transactions" className="text-decoration-none">
            View All
          </Link>
        </div>

        <Card className="p-3 shadow-sm" style={{ borderRadius: 20 }}>
          {txns.length === 0 && (
            <p className="text-muted">No recent transactions</p>
          )}

          {txns.map((t) => (
            <TransactionCard key={t._id} t={t} />
          ))}
        </Card>
      </Container>
    </>
  );
}
