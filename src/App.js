import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Classes from './Components/Students/Classes/Classes';
import Certificates from './Components/Students/Certificates/Certificates';
import HistoryApplications from './Components/Students/ClassesApplication/HistoryApplications/HistoryApplications';
import NewClassesApplication1 from './Components/Students/ClassesApplication/NewClassesAppliction/NewClassesApplication1/NewClassesApplication1';
import NewClassesApplication2 from './Components/Students/ClassesApplication/NewClassesAppliction/NewClassesApplication2/NewClassesApplication2';
import NewClassesApplication3 from './Components/Students/ClassesApplication/NewClassesAppliction/NewClassesApplication3/NewClassesApplication3';
import Grades from './Components/Students/Grades/Grades';
import FAQ from './Components/Students/FAQ/FAQ';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import StudentDetails from './Components/Students/Profile/StudentDetails/StudentDetails';

import Profile from './Components/Professors/Profile/Profile';

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
          <Route path="/home/profile/student-details" element={<StudentDetails />}/>
          <Route path="/home/history-applications" element={<HistoryApplications />}/>
          <Route path="/home/history-applications/new-application1" element={<NewClassesApplication1 />}/>
          <Route path="/home/history-applications/new-application2" element={<NewClassesApplication2 />}/>
          <Route path="/home/history-applications/new-application3" element={<NewClassesApplication3 />}/>


          <Route path="/professors/profile" element={<Profile />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
