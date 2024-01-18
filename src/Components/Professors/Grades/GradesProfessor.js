import React from 'react';
import styles from './GradesProfessor.module.css'; 
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { HiPlus } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom'; 
import DataTableProfessorGrades from '../../DataTable/DataTableProfessorGrades';

function GradesProfessor() {
  const navigate = useNavigate();  // Updated hook
  const location = useLocation();

  const handleNewGradeClick = () => {
    // Navigate to the desired link or route
    navigate('/home/professor-grades/new-grade1'); 
  };

  // Remove 'gradesData' from local storage
  localStorage.removeItem('gradesData');


  return(
    <div className={styles.wrapper}>
        <div className={styles.header}>
          <Header />
        </div>

        <div className={styles.sidebar}>
          <Sidebar currentPath={location.pathname} />
        </div>

        <div className={styles.main}>
          <button className={styles.newGradeButton} onClick={handleNewGradeClick}>
            <HiPlus style={{ marginRight: '5px' }} />
            Νέο Βαθμολόγιο
          </button>
          <DataTableProfessorGrades collectionName={'classesforgrade'}/>
        </div>
    </div>
  );
}
  
export default GradesProfessor;