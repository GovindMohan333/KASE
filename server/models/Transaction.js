const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  type: {
    type: String, // TOPUP, SEND, RECEIVE
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
