import logo from './logo.svg';
import './App.css';
import Amplify, { API } from 'aws-amplify'
import React, { useEffect, useState } from 'react'

const myAPI = "apihpot"
const path = '/client'; 

const App = () => {
  const [input, setInput] = useState("")
  const [clients, setClient] = useState([])

  //Function to fetch from our backend and update customers array
  function getClient(e) {
    let clientCode = e.input
    // this line actually makes the API call passing the input value as parameter.
    API.get(myAPI, path + "/" + clientCode)
       .then(response => {
         //log response
         console.log('response',response)
         // add current response to client array
         let newClient = [...clients]
         newClient.push(response)
         setClient(newClient)

       })
       .catch(error => {
         console.log(error)
       })
    console.log('clients:', clients);
  }

  return (
    
    <div className="App">
      <h1>Super Simple React App</h1>
      <div>
          <input placeholder="customer id" type="text" value={input} onChange={(e) => setInput(e.target.value)}/>      
      </div>
      <br/>
      <button onClick={() => getClient({input})}>Get Client From Backend</button>

      <h2 style={{visibility: clients.length > 0 ? 'visible' : 'hidden' }}>Response</h2>
      {
       clients.map((thisClient, index) => {
         return (
        <div key={thisClient.code}>
          <span><b>Code:</b> {thisClient.code} - <b>Client Name</b>: {thisClient.clientName}</span>
        </div>)
       })
      }
    </div>
  )
}

export default App;