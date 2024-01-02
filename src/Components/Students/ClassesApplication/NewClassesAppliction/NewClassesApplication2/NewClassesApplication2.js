import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../../../Breadcrumb/Breadcrumb';
import Sidebar from '../../../../Sidebar/Sidebar';
import Header from '../../../../Header/Header';
import SemesterDropDown from '../SemesterDropDown';
import TableComponent from '../../../../DataTable/DataTable';
import appstyle from '../NewClassesApplication.module.css';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi2';

function NewClassesApplication2() {
  const [selectedSemester, setSelectedSemester] = useState(1);

  useEffect(() => {
    const localStorageContent = localStorage.getItem('objectGreeting');
    console.log('Local Storage Content:', localStorageContent);
  }, []);

  return (
    <div>
      <Header />
      <Breadcrumb />
      <Sidebar />
      <SemesterDropDown onSelectSemester={setSelectedSemester} />
      <TableComponent showOptionColumn={true} selectedSemester={selectedSemester} pageStyle={appstyle}  />
      <a href="/home/history-applications/new-application3" className={appstyle['next-page']}>
        Επόμενο <HiChevronRight />
      </a>
      <a href="/home/history-applications/new-application1" className={appstyle['previous-page']}>
        <HiChevronLeft /> Προηγούμενο
      </a>
    </div>
  );
}

export default NewClassesApplication2;
