// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Classes from './Components/Students/Classes/Classes';
import Certificates from './Components/Students/Certificates/Certificates';
import GeneralStudent from './Components/Students/Profile/GeneralStudent/GeneralStudent';
import Grades from './Components/Students/Grades/Grades';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/classes" element={<Classes />}/>
          <Route path="/certificates" element={<Certificates />}/>
          <Route path="/grades" element={<Grades />}/>
          <Route path="/general-student" element={<GeneralStudent />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
