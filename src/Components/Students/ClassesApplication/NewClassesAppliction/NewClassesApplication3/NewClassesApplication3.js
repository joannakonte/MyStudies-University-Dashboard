import React, { useState } from 'react';
import Breadcrumb from '../../../../Breadcrumb/Breadcrumb';
import Sidebar from '../../../../Sidebar/Sidebar';
import Header from '../../../../Header/Header';
// import SemesterTable from '../../Classes/SemesterTable';
import SemesterDropDown from '../SemesterDropDown';
import TableComponent from '../../../../DataTable/DataTable';
import appstyle from '../NewClassesApplication.module.css';
import {HiChevronRight, HiChevronLeft} from "react-icons/hi2";


function NewClassesApplication3() {
  const [selectedSemester, setSelectedSemester] = useState(1);

  const shoot = (a) => {
    alert(a);
  };

  return (
    <div>
      <Header />
      <Breadcrumb />
      <Sidebar />
      <SemesterDropDown onSelectSemester={setSelectedSemester} />
      {/* <SemesterTable onSelectSemester={setSelectedSemester} /> */}
      {/* <TableComponent showOptionColumn={true} selectedSemester={selectedSemester} pageStyle={appstyle} /> */}
      <TableComponent showOptionColumn={true} selectedSemester={selectedSemester} pageStyle={appstyle} submission={true} />
      <a href="/home/history-applications/submission" className={appstyle['next-page']}>
       Επόμενο <HiChevronRight  /> 
      </a>
      <a href="/home/history-applications/new-application2" className={appstyle['previous-page']}>
      <HiChevronLeft  /> Προηγούμενο 
      </a>
      
      {/* <button className={appstyle['next-page']} onClick={() => shoot('Goal!')}>
       Επόμενο <HiChevronRight  />
      </button> */}
    </div>
  );
}

export default NewClassesApplication3;
