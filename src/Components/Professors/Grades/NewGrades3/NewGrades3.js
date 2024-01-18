import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NewGrades3.module.css'; 
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import ProcessBar from '../ProcessBar/ProcessBar';
import { HiCheck, HiChevronLeft } from 'react-icons/hi2';

function NewGrades3() {

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
            <div className={styles['previous']}>
              <Link to="/home/professor-grades/new-grade1/new-grade2" className={styles['previous-page']}>
                <HiChevronLeft /> Προηγούμενο
              </Link>
            </div>

            <div className={styles['buttons2']}>
              <button href="/home/professor-grades" className={styles['save']} >
                Προσωρινή Αποθήκευση
              </button>

              <button className={styles['submit']} >
                <HiCheck /> Οριστική υποβολή
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}
  
export default NewGrades3;