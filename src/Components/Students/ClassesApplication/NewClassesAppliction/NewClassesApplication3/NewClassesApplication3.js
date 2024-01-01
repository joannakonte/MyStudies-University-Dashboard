import React, { useState } from 'react';
import Breadcrumb from '../../../../Breadcrumb/Breadcrumb';
import Sidebar from '../../../../Sidebar/Sidebar';
import Header from '../../../../Header/Header';
// import SemesterTable from '../../Classes/SemesterTable';
import SemesterDropDown from '../SemesterDropDown';
import TableComponent from '../../../../DataTable/DataTable';
import appstyle from './NewClassesApplication2.module.css';
import {HiChevronRight} from "react-icons/hi2";


function NewClassesApplication() {
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
      <TableComponent showOptionColumn={true} selectedSemester={selectedSemester} pageStyle={appstyle} />
      <button className={appstyle['next-page']} onClick={() => shoot('Goal!')}>
       Επόμενο <HiChevronRight  />
      </button>
    </div>
  );
}

export default NewClassesApplication;
