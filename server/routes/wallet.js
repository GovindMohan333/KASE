const express = require("express");
const router = express.Router();
const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

// GET BALANCE
router.get("/balance", auth, async (req, res) => {
  const wallet = await Wallet.findOne({ user: req.user });
  res.json({ balance: wallet.balance });
});

// ADD MONEY (TOP-UP)
router.post("/topup", auth, async (req, res) => {
  const { amount } = req.body;

  if (amount <= 0) return res.status(400).json({ message: "Invalid amount" });

  const wallet = await Wallet.findOne({ user: req.user });
  wallet.balance += amount;
  await wallet.save();

  await Transaction.create({
    user: req.user,
    type: "TOPUP",
    amount,
    from: null,
    to: req.user
  });

  res.json({ message: "Money added successfully", balance: wallet.balance });
});

// SEND MONEY
router.post("/send", auth, async (req, res) => {
  const { email, amount } = req.body;

  const senderWallet = await Wallet.findOne({ user: req.user });
  const receiverUser = await User.findOne({ email });

  if (!receiverUser) return res.status(404).json({ message: "Recipient not found" });

  if (senderWallet.balance < amount) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  const receiverWallet = await Wallet.findOne({ user: receiverUser._id });

  // Update balances
  senderWallet.balance -= amount;
  receiverWallet.balance += amount;

  await senderWallet.save();
  await receiverWallet.save();

  // Transaction logs
  await Transaction.create({
    user: req.user,
    type: "SEND",
    amount,
    to: receiverUser._id
  });

  await Transaction.create({
    user: receiverUser._id,
    type: "RECEIVE",
    amount,
    from: req.user
  });

  res.json({ message: "Money sent successfully" });
});

// GET TRANSACTION HISTORY
router.get("/history", auth, async (req, res) => {
  const transactions = await Transaction.find({ user: req.user }).sort({ createdAt: -1 });

  res.json({ transactions });
});

module.exports = router;
