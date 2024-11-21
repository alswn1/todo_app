import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    axios.get('http://localhost:5000')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.error('There was an error! ', err);
      });
  }, []);

  return (
    <div className="App">
      <h1>백엔드에서 받은 데이터</h1>
      <p>{data}</p>
    </div>
  );
}

export default App;