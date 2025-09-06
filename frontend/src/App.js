import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [backendReady, setBackendReady] = useState(null);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("")
  const [description, setDescription] = useState("");
  const [item, setItem] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState('expense');
  const [total, setTotal] = useState(0);

async function waitForBackend(url, retries = 5, delay = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(url);
        if (res.ok) return true;
      } catch (err) {
        console.log("Backend not ready, retrying...");
      }
      await new Promise(r => setTimeout(r, delay));
    }
    return false;
  }

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_URL + "/api/getAllTransactions";
    waitForBackend(backendUrl).then(isReady => {
      setBackendReady(isReady);
      if (isReady) showTransactions();
    });
  }, []);

  function reloadPage() {
    window.location.reload();
  }

  function handleDateChange(event) {
    const value = event.target.value;
    const today = new Date().toISOString().split("T")[0];

    if (value > today) {
      setDate(""); // clear invalid date
      setDateError("Date cannot be later than today");
    } else {
      setDate(value);
      setDateError("")
    }
  }
  function handleAmountChange(event) {

    const value = event.target.value;
    setAmount(value);
    if (value === "" || /^\d*\.?\d*$/.test(value)) {

      setAmountError("");
    } else {
      // Keep showing what user typed, but mark error
      setAmountError("Please enter a valid number (e.g., 123 or 45.67)");
    }
  }
  function showTransactions(event) {
    const url = process.env.REACT_APP_API_URL + "/api/getAllTransactions";

    fetch(url)
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(err => console.error("error"));
  }
  useEffect(() => {
    showTransactions();
  }, []);


  function addNewTransaction(event) {
    // FileSystem.preventDefault()
    event.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/api/transaction';
    const finalAmount = type === "expense" ? -Math.abs(amount) : Math.abs(amount);
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ amount: finalAmount, item, date, description }),
    }).then((response) =>
      response.json()).then((json) => {
        console.log("Saved: ", json);
        setAmount("");
        setItem("");
        setDate("");
        setDescription("");
        setType("expense");
      })
      .catch(err => console.error("Error saving transaction: ", err));
  }
  function calculateTotal() {
    let sum = transactions.reduce((acc, t) => acc + t.amount, 0);
    setTotal(sum);
  }

  if(backendReady === null){
        return <main>Checking backend...</main>;
  }
  if(backendReady === false){
     return (
      <main >
        <h1>Backend Service Not Available</h1>
        <p>Please start the backend service before using the app.</p>
        <p>
          <a href="https://" target="_blank" rel="noreferrer">Start Backend Service</a>
        </p>
        <button onClick={reloadPage}>Reload Page</button>
      </main>
    );
  }

  return (
      <main style={{ textAlign: "center", padding: "50px" }}>
        <h1>Backend Service Not Available</h1>
        <p>Please start the backend service before using the app.</p>
        <p>
          <a href="YOUR_BACKEND_START_LINK_HERE" target="_blank" rel="noreferrer">
            Start Backend Service
          </a>
        </p>
        <button onClick={reloadPage}>Reload Page</button>
      </main>
    );
}

export default App;
