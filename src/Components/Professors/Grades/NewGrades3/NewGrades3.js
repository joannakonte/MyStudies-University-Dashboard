import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { Link, useNavigate } from 'react-router-dom';
import styles from './NewGrades3.module.css'; 
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import ProcessBar from '../ProcessBar/ProcessBar';
import { HiCheck, HiChevronLeft } from 'react-icons/hi2';
import GradesTable from './GradesTable3'
import { doc, where, getDocs, query, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebase'; 

function NewGrades3() {
  const stages = ['Επιλογή Μαθήματος', 'Καταχώρηση Βαθμολογίας ', 'Υποβολή Βαθμολογίας'];
  const department = "Τμήμα Πληροφορικής και Τηλεπικοινωνιών";
  const [className, setClassName] = useState("");
  const location = useLocation();
  const [professorID, setProfessorID] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const firebaseTimestamp = serverTimestamp();
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);
  const currentDate = new Date();   
  const formatDate = (date) => {
    const currentMonthIndex = date.getMonth();
    const season = (currentMonthIndex >= 9 || currentMonthIndex < 2) ? 'Χειμερινό Εξάμηνο' : 'Εαρινό Εξάμηνο';
    const year = (currentMonthIndex < 2) ? date.getFullYear() - 1 : date.getFullYear();

    return `${season} ${year}`;
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

  const saveGrades = async () => {
    try {
        const gradesData = JSON.parse(localStorage.getItem('gradesData')) || [];
  
        // Fetch the document ID of the class grades document
        const gradesQuery = query(collection(db, "studentclassidgrade"), where("classId", "==", selectedClass));
        const gradesSnapshot = await getDocs(gradesQuery);
  
        if (!gradesSnapshot.empty) {
            // Assuming there is only one document per class
            const gradeDocId = gradesSnapshot.docs[0].id;
  
            // Prepare the updated grades array
            const updatedGradesArray = gradesData.map(({ studentAM, studentGrade }) => ({ AM: studentAM, grade: studentGrade }));
  
            // Get a reference to the document
            const gradeDocRef = doc(db, "studentclassidgrade", gradeDocId);
  
            // Update the document
            await updateDoc(gradeDocRef, {
                grades: updatedGradesArray
            });
  
            console.log("Grades updated successfully");
  
            // Clear local storage and set submission status to successful
            localStorage.removeItem('gradesData');
            localStorage.removeItem('selectedClass');
            setIsSubmissionSuccessful(true);
        } else {
            console.log("No document found for the classId");
        }
    } catch (error) {
        console.error("Error updating grades: ", error);
    }
  };  

  const navigate = useNavigate();

    const handleClosePopup = () => {
        setIsSubmissionSuccessful(false);
        navigate('/home/professor-grades');
    };

    const Popup = () => (
      <div className={styles.popupOverlay}>
          <div className={styles.successPopup}>
              <button className={styles.closeButton} onClick={handleClosePopup}> &times;</button>
              <div className={styles.popupHeader}></div>
              <h3>Οι βαθμολογίες υποβλήθηκαν επιτυχώς!</h3>
          </div>
      </div>
  );  

  return(
    <div className={styles.wrapper}>
        <div className={styles.header}>
          <Header />
        </div>

        <div className={styles.sidebar}>
          <Sidebar currentPath={location.pathname} />
        </div>

        <div className={styles.main}>
          <ProcessBar stages={stages} currentStage={2} />

          <div className={styles.infoBox}>
            {department} - {className} - {formatDate(currentDate)}
          </div>

          <GradesTable/>

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

              <button className={styles['submit']} onClick={saveGrades}>
                <HiCheck /> Οριστική υποβολή
            </button>
            </div>
          </div>
          {isSubmissionSuccessful && <Popup/>}
        </div>
    </div>
  );
}
  
export default NewGrades3;