import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

import ProfileStudent from './Components/Students/Profile/ProfileStudent';
import Classes from './Components/Students/Classes/Classes';
import HistoryApplications from './Components/Students/ClassesApplication/HistoryApplications/HistoryApplications';
import NewClassesApplication1 from './Components/Students/ClassesApplication/NewClassesAppliction/NewClassesApplication1/NewClassesApplication1';
import NewClassesApplication2 from './Components/Students/ClassesApplication/NewClassesAppliction/NewClassesApplication2/NewClassesApplication2';
import NewClassesApplication3 from './Components/Students/ClassesApplication/NewClassesAppliction/NewClassesApplication3/NewClassesApplication3';
import Grades from './Components/Students/Grades/Grades';
import Certificates from './Components/Students/Certificates/Certificates';
import VisitHistory from './Components/Students/VisitHistory/VisitHistory';
import FAQ from './Components/Students/FAQ/FAQ';

// import Profile from './Components/Profile/Profile';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/login" element={<Login />} />
          <Route path="/home/register" element={<Register />} />

          {/* Paths for Students */}
          <Route path="/home/profile" element={<ProfileStudent />}/>
          <Route path="/home/classes" element={<Classes />}/>
          <Route path="/home/history-applications" element={<HistoryApplications />}/>
          <Route path="/home/history-applications/new-application1" element={<NewClassesApplication1 />}/>
          <Route path="/home/history-applications/new-application2" element={<NewClassesApplication2 />}/>
          <Route path="/home/history-applications/new-application3" element={<NewClassesApplication3 />}/>
          <Route path="/home/grades" element={<Grades />}/>
          <Route path="/home/certificates" element={<Certificates />}/>
          <Route path="/home/visit-history" element={<VisitHistory/>}/>
          <Route path="/home/faq" element={<FAQ/>}/>

          {/* Paths for Professors */}
          {/* <Route path="/professors/profile" element={<Profile />}/> */}


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
