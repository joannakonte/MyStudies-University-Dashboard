import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './NewGrades2.module.css'; 
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import ProcessBar from '../ProcessBar/ProcessBar';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi2';
import GradesTable from './GradesTable2'

function NewGrades2() {
  const stages = ['Επιλογή Μαθήματος', 'Καταχώρηση Βαθμολογίας ', 'Υποβολή Βαθμολογίας'];

  const department = "Τμήμα Πληροφορικής και Τηλεπικοινωνιών";
  const className = "Τμήμα Πληροφορικής και Τηλεπικοινωνιών";
  const period = "ΧΕΙΜ 2024";
  
  const location = useLocation();

  const [professorID, setProfessorID] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    // Fetching professor's ID and selected class from local storage
    const currentProfessorSDI = localStorage.getItem('sdi');
    const storedSelectedClass = localStorage.getItem('selectedClass');

    if (currentProfessorSDI) {
      setProfessorID(currentProfessorSDI);
    } else {
      console.error("No professor is currently logged in.");
    }

    if (storedSelectedClass) {
      setSelectedClass(storedSelectedClass);
      console.log(selectedClass.id);
    } else {
      console.error("No class is currently selected.");
    }
  }, []);  

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



        <GradesTable professorID={professorID} classId={selectedClass}/>

          <div className={styles['button-container']}>
            <Link to="/home/professor-grades/new-grade1" className={styles['previous-page']}>
              <HiChevronLeft /> Προηγούμενο
            </Link>
            
            <Link to="/home/professor-grades/new-grade1/new-grade2/new-grade3" className={styles['next-page']}>
              Επόμενο <HiChevronRight  />
            </Link>
          </div>
        </div>
    </div>
  );
}
  
export default NewGrades2;