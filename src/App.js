import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Calender from './components/Calender';
import DateDetails from './pages/DateDetails';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
          <Header />
          <Routes>
            <Route path="/" element={<Calender />} />
            <Route path="/DateDetails" element={<DateDetails />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;