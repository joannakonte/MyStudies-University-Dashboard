import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './NewGrades1.module.css'; 
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import ProcessBar from '../ProcessBar/ProcessBar';
import { HiChevronRight } from "react-icons/hi2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { db } from '../../../../firebase';
import { collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore';

function NewGrades1() {
  const stages = ['Επιλογή Μαθήματος', 'Καταχώρηση Βαθμολογίας ', 'Υποβολή Βαθμολογίας'];
  const location = useLocation();
  const department = "Τμήμα Πληροφορικής και Τηλεπικοινωνιών";
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [professorsClasses, setProfessorsClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const firebaseTimestamp = serverTimestamp();

  // Current date for display purposes
  const currentDate = new Date();
  const formatDate = (date) => {
    const currentMonthIndex = date.getMonth();
    const season = (currentMonthIndex >= 9 || currentMonthIndex < 2) ? 'Χειμερινό Εξάμηνο' : 'Εαρινό Εξάμηνο';
    const year = (currentMonthIndex < 2) ? date.getFullYear() - 1 : date.getFullYear();

    return `${season} ${year}`;
  };

  useEffect(() => {
    const fetchProfessorsClasses = async () => {
      // Check for the previously selected class in localStorage
      const storedSelectedClass = localStorage.getItem('selectedClass');
  
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
          setProfessorsClasses(professorData.classes); 
          // Check if the storedSelectedClass is among the fetched classes
          if (professorData.classes.includes(storedSelectedClass)) {
            setSelectedClass(storedSelectedClass);
          }
        }
      } else {
        console.error("No professor found with the given sdi:", currentProfessorSDI);
      }
    };
  
    fetchProfessorsClasses();
  }, []); 
  
  useEffect(() => {
    // Save the selected class to local storage whenever it changes
    if (selectedClass) {
      localStorage.setItem('selectedClass', selectedClass);
    }
  }, [selectedClass]);
  

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
            {department} - {formatDate(currentDate)}
          </div>

          <div className={styles.container}>
            <div className={styles.inputGroup}>
              <label htmlFor="course" className={styles.formLabel}>
                Επιλογή Μαθήματος:
              </label>
              <div className={styles.selectWrapper}>
                <select
                  id="class"
                  name="class"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
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
            <Link to="/home/professor-grades/new-grade1/new-grade2" className={styles['next-page']}>
                Επόμενο <HiChevronRight />
            </Link>
          </div>
        </div>
    </div>
  );
}
  
export default NewGrades1;