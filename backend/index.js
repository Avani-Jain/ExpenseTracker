require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Transaction = require("./models/transaction");

const app = express();
const PORT = process.env.PORT || 3008;

app.use(cors());
app.use(express.json());

// Connect once at startup
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send({ message: "Backend working!" });
});

app.post("/api/transaction", async (req, res) => {
  const { amount, item, date, description } = req.body;
  const transaction = await Transaction.create({ amount, item, date, description });
  res.json(transaction);
});

app.get("/api/getAllTransactions", async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
