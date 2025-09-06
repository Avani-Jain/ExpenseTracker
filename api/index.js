const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const Transaction = require('./models/transaction')
const mongoose = require('mongoose')
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3008;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error: ", err));



app.get('/', (req, res) => {
    res.send({ body: "testing successful" });
});

app.post('/api/transaction',async(req, res) => {
    const{amount, item, date, description} = req.body;
    // await mongoose.connect(process.env.MONGO_URL);
    const transaction = await Transaction.create({item, description, date, amount});
    res.json(transaction);
});

app.get("/api/getAllTransactions", async(req, res)=>{
    // await mongoose.connect(process.env.MONGO_URL);
    const getAll = await Transaction.find()
    console.log(getAll);
    res.json(getAll)
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
