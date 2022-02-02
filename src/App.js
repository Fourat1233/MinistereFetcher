import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState,useRef ,useCallback } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table'


function App() {
  const [isSending, setIsSending] = useState(false)
  const isMounted = useRef(true)
  let [responseData, setResponseData] = React.useState([{}])
  let [responseData2, setResponseData2] = React.useState([{}])

  // set isMounted to false when we unmount the component
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, []);
  const [cin, setCin] = useState('')
  function fetchCin (event,cin) {
    event.preventDefault();

  

    var data = '';
    var config = {
      method: 'get',
      url: `http://localhost:8083/api/infraction/${cin}`,
      headers: {
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      },
      data : data
    };
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setResponseData(response.data)
     // console.log(responseData);

    })
    .catch(function (error) {
      console.log(error);
    });

    var config2 = {
      method: 'get',
      url: `http://localhost:8083/api/avis/${cin}`,
      headers: {
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      },
      data : data
    };
    axios(config2)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setResponseData2(response.data)
      //console.log(responseData2);
    })
    .catch(function (error) {
      console.log(error);
    });
   
  }
 
  // const sendRequest = useCallback(async (e) => {
  //   // don't send again while we are sending
   
  //   // once the request is sent, update state again
  //   if (isMounted.current) // only update if we are still mounted
  //     setIsSending(false)
  // }, [isSending]) // update the callback if the state changes
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form>
  <label>
    <div>
    Cin:
    </div>
    <input type="text" onChange={event => {setCin(event.target.value);}} />
  </label>
  <div>
  {/* <button onClick={sendRequest}>Search</button> */}
  <button onClick={(e) => fetchCin(e,cin)}>Search</button>

  </div>
</form>
Avis de recherche :
<Table striped bordered hover>
  <thead>
    <tr>
      <th>cin</th>
      <th>Violation</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    
    { responseData?.map((inf) => {
                return <tr><td>{inf.cin}</td><td>{inf.violation}</td><td>{inf.montant}</td></tr>
            })}


  </tbody>
</Table>

<hr></hr>
Infractions:
<Table striped bordered hover>
  <thead>
    <tr>
      <th>cin</th>
      <th>reason</th>
      <th>date</th>
    </tr>
  </thead>
  <tbody>
  { responseData2?.map((inf) => {
                return <tr><td>{inf.cin}</td><td>{inf.reason}</td><td>{inf.date}</td></tr>
            })}
  </tbody>
</Table>
      </header>

    </div>
  );
}

export default App;
