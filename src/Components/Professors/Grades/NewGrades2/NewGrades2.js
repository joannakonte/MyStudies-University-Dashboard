import React from 'react';
import styles from './NewGrades2.module.css'; 
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import ProcessBar from '../ProcessBar/ProcessBar';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi2';

function NewGrades2() {
  const stages = ['Επιλογή Μαθήματος', 'Καταχώρηση Βαθμολογίας ', 'Υποβολή Βαθμολογίας'];

  const department = "Τμήμα Πληροφορικής και Τηλεπικοινωνιών";
  const className = "Τμήμα Πληροφορικής και Τηλεπικοινωνιών";
  const period = "ΧΕΙΜ 2024";
  
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
          <ProcessBar stages={stages} currentStage={0} />

          <div className={styles.infoBox}>
            {department} - {className} - {period}
          </div>





          <div className={styles['button-container']}>
            <a href="/home/professor-grades/new-grade1/new-grade2" className={styles['previous-page']}>
              <HiChevronLeft /> Προηγούμενο
            </a>
            
            <a href="/home/professor-grades/new-grade1/new-grade2/new-grade3" className={styles['next-page']}>
              Επόμενο <HiChevronRight  />
            </a>
          </div>
        </div>
    </div>
  );
}
  
export default NewGrades2;