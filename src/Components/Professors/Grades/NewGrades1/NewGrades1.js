import React, { useState } from 'react';
import styles from './NewGrades1.module.css'; 
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import ProcessBar from '../ProcessBar/ProcessBar';
import { HiChevronRight } from "react-icons/hi2";

function NewGrades1() {
  const stages = ['Επιλογή Μαθήματος', 'Καταχώρηση Βαθμολογίας ', 'Υποβολή Βαθμολογίας'];
  
  const location = useLocation();

  const department = "Τμήμα Πληροφορικής και Τηλεπικοινωνιών";
  const className = "Τμήμα Πληροφορικής και Τηλεπικοινωνιών";
  const period = "ΧΕΙΜ 2024";

  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedScale, setSelectedScale] = useState('');

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleScaleChange = (event) => {
    setSelectedScale(event.target.value);
  };

  const handleShowOptionsClick = () => {
    // Use the selected options in your logic to show or process them
    console.log('Selected Department:', selectedDepartment);
    console.log('Selected Course:', selectedCourse);
    console.log('Selected Scale:', selectedScale);
  };


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

          <div className={styles.container}>
            <div className={styles.inputGroup}>
              <label htmlFor="department" className={styles.fromlabel}>
                Επιλογή Τμήματος:
              </label>
              <select
                id="department"
                name="department"
                value={selectedDepartment}
                onChange={handleDepartmentChange}
                className={styles.selectBox}
              >
                <option value="">Επιλογή Τμήματος...</option>
                <option value="option1">Τμήμα Πληροφορικής και Τηλεπικοινωνιών</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="course" className={styles.fromlabel}>
                Επιλογή Μαθήματος:
              </label>
              <select
                id="course"
                name="course"
                value={selectedCourse}
                onChange={handleCourseChange}
                className={styles.selectBox}
              >
                <option value="">Επιλογή Μαθήματος...</option>
                <option value="option1">Λογική Σχεδίαση</option>
                <option value="option2">Αντικειμενοστραφής Προγραμματισμός</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="scale" className={styles.fromlabel}>
                Επιλογή Κλίμακας:
              </label>
              <select
                id="scale"
                name="scale"
                value={selectedScale}
                onChange={handleScaleChange}
                className={styles.selectBox}
              >
                <option value="">Επιλογή Κλίμακας:...</option>
                <option value="option1">1 - 10</option>
                <option value="option2">1 - 20</option>
                <option value="option3">1 - 100</option>
              </select>


              <button className={styles.showOptionsButton} onClick={handleShowOptionsClick}>
                Εμφάνιση Επιλογών
              </button>
            </div>
          </div>

          <div className={styles['next']}>
            <a href="/home/professor-grades/new-grade1/new-grade2" className={styles['next-page']}>
              Επόμενο <HiChevronRight  /> 
            </a>
          </div>

        </div>
    </div>
  );
}
  
export default NewGrades1;