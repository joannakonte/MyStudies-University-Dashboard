import React, { useState } from 'react';
// import Breadcrumb from '../../../../Breadcrumb/Breadcrumb';
import Sidebar from '../../../../Sidebar/Sidebar';
import Header from '../../../../Header/Header';
// import SemesterTable from '../../Classes/SemesterTable';
import SemesterDropDown from '../SemesterDropDown';
import TableComponent from '../../../../DataTable/DataTable';
import appstyle from '../NewClassesApplication.module.css';
import {HiChevronRight, HiDocumentPlus} from "react-icons/hi2";
import ProcessBar from '../ProcessBar/ProcessBar'

function NewClassesApplication1() {
  const [selectedSemester, setSelectedSemester] = useState(1);
  const stages = ['Επιλογή Εξαμήνου', 'Επιλογή Μαθημάτων', 'Υποβολή Δήλωσης'];


  return (
    <div>
      <Header />
      {/* <Breadcrumb /> */}
      <Sidebar />
      <ProcessBar stages={stages} currentStage={0} /> 
      <SemesterDropDown onSelectSemester={setSelectedSemester} />
      {/* <SemesterTable onSelectSemester={setSelectedSemester} /> */}
      {/* <h1 className={appstyle['page-title']}><HiDocumentPlus className={appstyle['doc-icon']} />Νέα Δηλώση</h1> */}
      <TableComponent showOptionColumn={true} selectedSemester={selectedSemester} pageStyle={appstyle}  collectionName={'classes'} />
      <a href="/home/history-applications/new-application2" className={appstyle['next-page']}>
       Επόμενο <HiChevronRight  /> 
      </a>
    </div>
  );
}

export default NewClassesApplication1;
