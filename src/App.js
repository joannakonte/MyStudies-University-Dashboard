// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Classes from './Components/Students/Classes';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <Sidebar /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/classes" element={<Classes />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
