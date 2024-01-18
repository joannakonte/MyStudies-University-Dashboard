import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

import ProfileStudent from './Components/Students/Profile/ProfileStudent';
import UpdateData from './Components/Students/Profile/UpdateData/UpdateData';
import UpdatePassword from './Components/Students/Profile/UpdatePassword/UpdatePassword';
import Classes from './Components/Students/Classes/Classes';
import HistoryApplications from './Components/Students/ClassesApplication/HistoryApplications/HistoryApplications';
import NewClassesApplication1 from './Components/Students/ClassesApplication/NewClassesAppliction/NewClassesApplication1/NewClassesApplication1';
import NewClassesApplication2 from './Components/Students/ClassesApplication/NewClassesAppliction/NewClassesApplication2/NewClassesApplication2';
import NewClassesApplication3 from './Components/Students/ClassesApplication/NewClassesAppliction/NewClassesApplication3/NewClassesApplication3';
import Grades from './Components/Students/Grades/Grades';
import Certificates from './Components/Students/Certificates/Certificates';
import FAQ from './Components/Students/FAQ/FAQ';

import ProfileProfessor from './Components/Professors/Profile/ProfileProfessor';
import UpdateDataProfessor from './Components/Professors/Profile/UpdateDataProfessor/UpdateDataProfessor';
import UpdatePasswordProfessor from './Components/Professors/Profile/UpdatePasswordProfessor/UpdatePasswordProfessor';
import ClassesProfessor from './Components/Professors/Classes/ClassesProfessor';
import GradesProfessor from './Components/Professors/Grades/GradesProfessor';
import FAQProfessor from './Components/Professors/FAQ/FAQProfessor';
import NewGrades1 from './Components/Professors/Grades/NewGrades1/NewGrades1';
import NewGrades2 from './Components/Professors/Grades/NewGrades2/NewGrades2';
import NewGrades3 from './Components/Professors/Grades/NewGrades3/NewGrades3';

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
          <Route path="/home/profile/update-data" element={<UpdateData />}/>
          <Route path="/home/profile/update-password" element={<UpdatePassword />}/>
          <Route path="/home/classes" element={<Classes />}/>
          <Route path="/home/history-applications" element={<HistoryApplications />}/>
          <Route path="/home/history-applications/new-application1" element={<NewClassesApplication1 />}/>
          <Route path="/home/history-applications/new-application1/new-application2" element={<NewClassesApplication2 />}/>
          <Route path="/home/history-applications/new-application1/new-application2/new-application3" element={<NewClassesApplication3 />}/>
          <Route path="/home/grades" element={<Grades />}/>
          <Route path="/home/certificates" element={<Certificates />}/>
          <Route path="/home/faq" element={<FAQ/>}/>

          {/* Paths for Professors */}
          <Route path="/home/professor-profile" element={<ProfileProfessor />}/>
          <Route path="/home/professor-profile/update-data" element={<UpdateDataProfessor />}/>
          <Route path="/home/professor-profile/update-password" element={<UpdatePasswordProfessor />}/>
          <Route path="/home/professor-classes" element={<ClassesProfessor />}/>
          <Route path="/home/professor-grades" element={<GradesProfessor />}/>
          <Route path="/home/professor-grades/new-grade1" element={<NewGrades1 />}/>
          <Route path="/home/professor-grades/new-grade1/new-grade2" element={<NewGrades2 />}/>
          <Route path="/home/professor-grades/new-grade1/new-grade2/new-grade3" element={<NewGrades3 />}/>
          <Route path="/home/professor-faq" element={<FAQProfessor />}/>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
