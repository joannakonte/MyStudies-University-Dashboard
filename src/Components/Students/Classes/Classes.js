import React, { useState } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import SemesterTable from './SemesterTable';
import TableComponent from '../../DataTable/DataTable';
import defaultstyle from '../../DataTable/DefaultTable.module.css';
import { useLocation } from 'react-router-dom';
import styles from './Classes.module.css';


function Classes() {
  const location = useLocation();

  const [selectedSemester, setSelectedSemester] = useState(1); 

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {/* Header */}
        <Header />
      </div>

      <div className={styles.sidebar}>
        {/* Sidebar */}
        {/* <Sidebar setSelectedSemester={setSelectedSemester} /> */}
        {/* <Sidebar items={sidebarStudents} /> */}
        <Sidebar currentPath={location.pathname} />
      </div>

      <div className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.semtable}>
            <SemesterTable onSelectSemester={setSelectedSemester} />
          </div>

          <div className={styles.tablecomp}>
            <TableComponent showOptionColumn={false} selectedSemester={selectedSemester} pageStyle={styles} collectionName={'classes'}  showmarkedclasses={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Classes;
