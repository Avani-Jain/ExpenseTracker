import './App.css';
import { useState } from 'react';

function App() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [item, setItem] = useState("");

  function addNewTransaction(event){
    // FileSystem.preventDefault()
    event.preventDefault();
    const url =process.env.REACT_APP_API_URL+'/transaction';
    console.log(url);
    fetch(url, {
        method: "POST",
        headers:{"content-type": "application/json"},
        body: JSON.stringify({name, item, description}),
    }).then((response)=>{response.json().then((json)=>{
      console.log("result ", json);
    });
  });
  }

  return(
    <main>
      <h1>EXPENSE TRACKER</h1>

      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input type="text" value={name} onChange={event=>setName(event.target.value)} placeholder={"amount"}/>
          <input type="text" value={item} onChange={event=>setItem(event.target.value)} placeholder={'Item bought'}/>
          
        </div>
        <div>
          <input type="date" value={date} onChange={event=>setDate(event.target.value)}/>
        </div>
        <div className = "description">
          <input type="text" value={description} onChange={event=>setDescription(event.target.value)} placeholder={"description"}/> 
        </div>
        <br></br>
        <button> <b>Add New Transaction</b></button>
      </form>
      <div className="transactions"> 
        
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
        </div>
      </div>

      
    </main>
  )
}

export default App;
