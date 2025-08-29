const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3008;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send({ body: "testing successful" });
});

app.post('/api/transaction', (req, res) => {
    console.log("received transaction: ", req.body);
    res.json(req.body);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
