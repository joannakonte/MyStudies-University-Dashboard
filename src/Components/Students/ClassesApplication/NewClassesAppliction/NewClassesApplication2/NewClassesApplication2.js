import React, { useState, useEffect } from 'react';
import styles from './NewClassesApplication2.module.css'; 
import Header from '../../../Header/Header';
import Sidebar from '../../../Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';

import SemesterDropDown from '../SemesterDropDown';
import TableComponent from '../../../../DataTable/DataTable';
import appstyle from '../NewClassesApplication.module.css';
import { HiChevronRight, HiChevronLeft, HiDocumentPlus } from 'react-icons/hi2';
import ProcessBar from '../ProcessBar/ProcessBar'

function NewClassesApplication2() {
  const [selectedSemester, setSelectedSemester] = useState(1);
  const stages = ['Επιλογή Εξαμήνου', 'Επιλογή Μαθημάτων', 'Υποβολή Δήλωσης'];

  useEffect(() => {
    const localStorageContent = localStorage.getItem('objectGreeting');
    console.log('Local Storage Content:', localStorageContent);
  }, []);

  const location = useLocation();

  return(
    <div className={styles.wrapper}>
        <div className={styles.header}>
          <Header />
        </div>

        <div className={styles.sidebar}>
          <Sidebar currentPath={location.pathname} />
        </div>

        <div className={styles.main}>
          <ProcessBar stages={stages} currentStage={1} />
          <SemesterDropDown onSelectSemester={setSelectedSemester} />
          {/* <h1 className={appstyle['page-title']}><HiDocumentPlus className={appstyle['doc-icon']} />Νέα Δηλώση</h1> */}
          <TableComponent showOptionColumn={true} selectedSemester={selectedSemester} pageStyle={appstyle}  collectionName={'classes'}   showmarkedclasses={true} />
          <a href="/home/history-applications/new-application1/new-application2/new-application3" className={appstyle['next-page']}>
            Επόμενο <HiChevronRight />
          </a>
          <a href="/home/history-applications/new-application1" className={appstyle['previous-page']}>
            <HiChevronLeft /> Προηγούμενο
          </a>
        </div>
    </div>
  );
}

export default NewClassesApplication2;
