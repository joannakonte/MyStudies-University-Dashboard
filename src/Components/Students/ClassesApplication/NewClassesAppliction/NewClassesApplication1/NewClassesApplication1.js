import React, { useState } from 'react';
import Breadcrumb from '../../../../Breadcrumb/Breadcrumb';
import Sidebar from '../../../../Sidebar/Sidebar';
import Header from '../../../../Header/Header';
// import SemesterTable from '../../Classes/SemesterTable';
import SemesterDropDown from '../SemesterDropDown';
import TableComponent from '../../../../DataTable/DataTable';
import appstyle from '../NewClassesApplication.module.css';
import {HiChevronRight, HiChevronLeft} from "react-icons/hi2";


function NewClassesApplication1() {
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
      <TableComponent showOptionColumn={true} selectedSemester={selectedSemester} pageStyle={appstyle}  />
      <a href="/home/history-applications/new-application2" className={appstyle['next-page']}>
       Επόμενο <HiChevronRight  /> 
      </a>
    </div>
  );
}

export default NewClassesApplication1;
