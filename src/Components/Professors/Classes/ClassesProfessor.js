import React, { useState } from 'react';
import styles from './ClassesProfessor.module.css'; 
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import DataTableProfessorClasses from '../../DataTable/DataTableProfessorClasses';

function ClassesProfessor() {
  
  const location = useLocation();

  const [selectedSemester, setSelectedSemester] = useState(1); 


  return(
    <div className={styles.wrapper}>
        <div className={styles.header}>
          <Header />
        </div>

        <div className={styles.sidebar}>
          <Sidebar currentPath={location.pathname} />
        </div>

        <div className={styles.main}>
          <div className={styles.container}>
            <DataTableProfessorClasses collectionName={'classes'}/>
          </div>
        </div>
    </div>
  );
}
  
export default ClassesProfessor;