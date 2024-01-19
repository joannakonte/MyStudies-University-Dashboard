import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import styles from './NewGrades2.module.css'; 
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import ProcessBar from '../ProcessBar/ProcessBar';
import { HiChevronRight, HiChevronLeft, HiExclamationTriangle } from 'react-icons/hi2';
import GradesTable from './GradesTable2'
import { where, getDocs, query, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../firebase'; 

function NewGrades2() {
  const stages = ['Επιλογή Μαθήματος', 'Καταχώρηση Βαθμολογίας ', 'Υποβολή Βαθμολογίας'];
  const department = "Τμήμα Πληροφορικής και Τηλεπικοινωνιών";
  const [className, setClassName] = useState("");
  const location = useLocation();
  const [professorID, setProfessorID] = useState('');
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

  const [isAllGraded, setIsAllGraded] = useState(true); 
  const navigate = useNavigate();

  // Function to check if all students are graded
  const checkAllGraded = () => {
    const gradesData = JSON.parse(localStorage.getItem('gradesData')) || [];
    const ungraded = gradesData.some(grade => parseInt(grade.studentGrade) === 0);


    if (ungraded) {
      setIsAllGraded(false);
    } else {
      navigate('/home/professor-grades/new-grade1/new-grade2/new-grade3');
    }
  };

  // Close the popup and reset state
  const handleClosePopup = () => {
    setIsAllGraded(true);
  };

  useEffect(() => {
    // Fetching professor's ID and selected class from local storage
    const currentProfessorSDI = localStorage.getItem('sdi');
    const storedSelectedClass = localStorage.getItem('selectedClass');

    console.log(`Stored Selected Class: ${storedSelectedClass}`);

    if (currentProfessorSDI) {
      setProfessorID(currentProfessorSDI);
    } else {
      console.error("No professor is currently logged in.");
    }

    if (storedSelectedClass) {
      setSelectedClass(storedSelectedClass);
    } else {
      console.error("No class is currently selected.");
    }

    // Fetch the class name based on selectedClass
    const fetchClassName = async () => {
      if (storedSelectedClass) {
        // Adjust the field name 'classId' if it's different in your Firestore collection
        const classesQuery = query(collection(db, "classes"), where("id", "==", storedSelectedClass));
        try {
          const querySnapshot = await getDocs(classesQuery);
          if (!querySnapshot.empty) {
            const classData = querySnapshot.docs[0].data();
            setClassName(classData.name); 
          } else {
            console.log("No such class found for ID:", storedSelectedClass);
          }
        } catch (error) {
          console.error("Error fetching class name: ", error);
        }
      }
    };
    fetchClassName();
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
          <ProcessBar stages={stages} currentStage={1} />

          <div className={styles.infoBox}>
            {department} - {className} - {formatDate(currentDate)}
          </div>

         <GradesTable professorID={professorID} classId={selectedClass}/>

         <div className={styles['button-container']}>
            <Link to="/home/professor-grades/new-grade1" className={styles['previous-page']}>
              <HiChevronLeft /> Προηγούμενο
            </Link>
            
            <button onClick={checkAllGraded} className={styles['next-page']}>
              Επόμενο <HiChevronRight  />
            </button>
          </div>
        </div>
        {!isAllGraded && (
          <Popup open={true} onClose={handleClosePopup}>
            <div className={styles.popupOverlay}>
              <div className={styles.alertPopup}>
                <button className={styles.closeButton} onClick={handleClosePopup}> &times;</button>
                <div className={styles.popupHeader}></div>
                <HiExclamationTriangle  size={50} color="orange" />
                <h3>Δεν έχετε καταχωρήσει βαθμό σε όλους τους φοιτητές!</h3>
              </div>
            </div>
          </Popup>
        )}
    </div>
  );
}
  
export default NewGrades2;