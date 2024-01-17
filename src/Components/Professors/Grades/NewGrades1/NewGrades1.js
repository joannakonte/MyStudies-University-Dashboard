import React, { useState, useEffect } from 'react';
import styles from './NewGrades1.module.css'; 
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import ProcessBar from '../ProcessBar/ProcessBar';
import { HiChevronRight } from "react-icons/hi2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { db } from '../../../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function NewGrades1() {
  const stages = ['Επιλογή Μαθήματος', 'Καταχώρηση Βαθμολογίας ', 'Υποβολή Βαθμολογίας'];
  
  const location = useLocation();

  const department = "Τμήμα Πληροφορικής και Τηλεπικοινωνιών";
  const className = "Τμήμα Πληροφορικής και Τηλεπικοινωνιών";
  const period = "ΧΕΙΜ 2024";

  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleShowOptionsClick = () => {
    // Use the selected options in your logic to show or process them
    console.log('Selected Department:', selectedDepartment);
    console.log('Selected Course:', selectedCourse);
  };

  const [professorsClasses, setProfessorsClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    const fetchProfessorsClasses = async () => {
      try {
        // Retrieve the currently logged-in professor's identifier
        const currentProfessorSDI = localStorage.getItem('sdi');
  
        if (!currentProfessorSDI) {
          console.error("No professor is currently logged in.");
          return;
        }
  
        const q = query(collection(db, "students"), where("sdi", "==", currentProfessorSDI), where("type", "==", "professor"));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const docSnapshot = querySnapshot.docs[0];
          const professorData = docSnapshot.data();
  
          if (professorData && professorData.classes) {
            setProfessorsClasses(professorData.classes); // Assuming 'classes' is an array of class names
          }
        } else {
          console.error("No professor found with the given sdi:", currentProfessorSDI);
        }
      } catch (error) {
        console.error("Error fetching professors' classes: ", error);
      }
    };
  
    fetchProfessorsClasses();
  }, []);  

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
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
              <label htmlFor="department" className={styles.formLabel}>
                Επιλογή Τμήματος:
              </label>
              <div className={styles.selectWrapper}>
                <select
                  id="department"
                  name="department"
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                  className={styles['dropdown-select']}
                >
                  <option value="">Επιλογή Τμήματος...</option>
                  <option value="option1">Τμήμα Πληροφορικής και Τηλεπικοινωνιών</option>
                </select>
                <FontAwesomeIcon icon={faAngleDown} className={styles['select-arrow']}/>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="course" className={styles.formLabel}>
                Επιλογή Μαθήματος:
              </label>
              <div className={styles.selectWrapper}>
                <select
                  id="class"
                  name="class"
                  value={selectedCourse}
                  onChange={handleCourseChange}
                  className={styles['dropdown-select']}
                >
                  <option value="">Επιλογή Μαθήματος...</option>
                  {professorsClasses.map((classItem, index) => (
                    <option key={index} value={classItem}>
                      {classItem}
                    </option>
                  ))}
                </select>
                <FontAwesomeIcon icon={faAngleDown} className={styles['select-arrow']}/>
              </div>
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