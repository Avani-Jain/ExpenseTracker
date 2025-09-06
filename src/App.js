import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [item, setItem] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState('expense');
  const [total, setTotal] = useState(0);
  // admin
// GVeeXHkIKcE70fSj

function showTransactions(event){
  const url = process.env.REACT_APP_API_URL+"/api/getAllTransactions";
  
  fetch(url)
  .then(res =>res.json())
  .then(data =>setTransactions(data))
.catch(err =>console.error("error"));
}
useEffect(()=>{
  showTransactions();
}, []);


  function addNewTransaction(event){
    // FileSystem.preventDefault()
    event.preventDefault();
    const url =process.env.REACT_APP_API_URL+'/api/transaction';
    console.log(url);
    const finalAmount = type==="expense"?-Math.abs(amount): Math.abs(amount);
    fetch(url, {
        method: "POST",
        headers:{"content-type": "application/json"},
        body: JSON.stringify({amount:finalAmount, item, date, description}),
    }).then((response)=>{response.json().then((json)=>{
      console.log("result ", json);
    });
  });
  }
  function calculateTotal(){
    let sum = transactions.reduce((acc, t)=>acc+t.amount, 0);
    setTotal(sum);
  }
  return(
    <main>
      <h1>EXPENSE TRACKER</h1>

      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input type="text" value={amount} onChange={event=>setAmount(event.target.value)} placeholder={"amount"}/>
          <input type="text" value={item} onChange={event=>setItem(event.target.value)} placeholder={'Item bought'}/>
          
        </div>
        <div>
          <input type="date" value={date} onChange={event=>setDate(event.target.value)}/>
        </div>
        <div className = "description">
          <input type="text" value={description} onChange={event=>setDescription(event.target.value)} placeholder={"description"}/> 
        </div>
        <div>
          <label>
        <input type="radio" name="type" value="expense" checked={type==="expense"} onChange={()=>setType("expense")}/>Expense
        </label>
        <label><input type="radio" name="type" value="earned" checked={type === "earned"} onChange={()=>setType("earned")}/>Earned</label>
        </div>
        <br></br>
        <button className="buttons"> <b>Add New Transaction</b></button>
      </form>
      <div className='calculate'>
        <button className="buttons" id="calculate_button" onClick={calculateTotal}> <b>Calculate Total Expenditure</b></button>
       <label className="show" style={{color:total<0?"red":"green"}}> {total!==0?Math.abs(total):"-"} </label>
      </div>
      <div className="transactions"> 
        {transactions.map((t, index)=>(
          <div key={index} className='single_transaction'>
            <div className='left'>
              <div className="name"> {t.item}
            </div>
            <div className='description'>{t.description}</div>
          </div>
          <div className="right">
            <div className={`price${t.amount<0?"_red":"_green"}`}>{t.amount}</div>
            <div className="datetime"> {new Date(t.date).toLocaleDateString()}</div>
              </div>
            </div>
        )
        )}
{/*         
        <div className="single_transaction">
          <div className="left">
            <div className="name"> new Headphones

            </div>
            <div className='description'>time to buy new. old were damaged.</div>
          </div>
          <div className="right">
            <div className='price'>500</div>
            <div className="datetime"> January 2024</div>
          </div>
        </div>
        <div className="single_transaction">
          <div className="left">
            <div className="name"> new Headphones

            </div>
            <div className='description'>time to buy new. old were damaged.</div>
          </div>
          <div className="right">
            <div className='price_green'>500</div>
            <div className="datetime"> January 2024</div>
          </div>
        </div>
        <div className="single_transaction">
          <div className="left">
            <div className="name"> new Headphones

            </div>
            <div className='description'>time to buy new. old were damaged.</div>
          </div>
          <div className="right">
            <div className='price_red'>500</div>
            <div className="datetime"> January 2024</div>
          </div>
        </div> */}
        </div>

      
    </main>
  )
}

export default App;
