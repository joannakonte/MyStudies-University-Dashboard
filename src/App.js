// App.js
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Classes from './Components/Students/Classes/Classes';
import Certificates from './Components/Students/Certificates/Certificates';
import GeneralStudent from './Components/Students/Profile/GeneralStudent/GeneralStudent';
import NewClassesApplication from './Components/Students/ClassesApplication/NewClassesAppliction/NewClassesApplication2/NewClassesApplication2';
import Grades from './Components/Students/Grades/Grades';
import FAQ from './Components/Students/FAQ/FAQ';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/login" element={<Login />} />
          <Route path="/home/classes" element={<Classes />}/>
          <Route path="/home/faq" element={<FAQ/>}/>
          <Route path="/home/certificates" element={<Certificates />}/>
          <Route path="/home/grades" element={<Grades />}/>
          <Route path="/home/profile/general-student" element={<GeneralStudent />}/>
          <Route path="/home/history-applications/new-application" element={<NewClassesApplication />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
