import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './NewGrades3.module.css'; 
import Header from '../../Header/Header';
import headers from '../../../../data/dataTableHeaderGradesStep2.json'
import Sidebar from '../../Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import ProcessBar from '../ProcessBar/ProcessBar';
import { HiCheck, HiChevronLeft } from 'react-icons/hi2';
import { doc, where, getDocs, query, collection, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebase'; 

function NewGrades3() {
  const stages = ['Επιλογή Μαθήματος', 'Καταχώρηση Βαθμολογίας ', 'Υποβολή Βαθμολογίας'];
  const department = "Τμήμα Πληροφορικής και Τηλεπικοινωνιών";
  const [className, setClassName] = useState("");
  const location = useLocation();
  const [selectedClass, setSelectedClass] = useState('');
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);
  const [studentsData, setStudentsData] = useState([]); // State to store students data
  const currentDate = new Date();   
  const formatDate = (date) => {
    const currentMonthIndex = date.getMonth();
    const season = (currentMonthIndex >= 9 || currentMonthIndex < 2) ? 'Χειμερινό Εξάμηνο' : 'Εαρινό Εξάμηνο';
    const year = (currentMonthIndex < 2) ? date.getFullYear() - 1 : date.getFullYear();

    return `${season} ${year}`;
  };

  
  useEffect(() => {
    const storedSelectedClass = localStorage.getItem('selectedClass');
    const savedGradesData = JSON.parse(localStorage.getItem('gradesData'));
    if (savedGradesData) {
      setStudentsData(savedGradesData);
    }
    if (storedSelectedClass) {
      setSelectedClass(storedSelectedClass);
      fetchClassName(storedSelectedClass);  // Fetch the class name
    }
  }, []);

  // Fetch the class name based on selectedClass
  const fetchClassName = async (classId) => {
    if (classId) {
      const classesQuery = query(collection(db, "classes"), where("id", "==", classId));
      try {
        const querySnapshot = await getDocs(classesQuery);
        if (!querySnapshot.empty) {
          const classData = querySnapshot.docs[0].data();
          setClassName(classData.name);
        } else {
          console.log("No such class found for ID:", classId);
        }
      } catch (error) {
        console.error("Error fetching class name: ", error);
      }
    }
  };

  // Save grades to database
  const saveGrades = async () => {
    if (!selectedClass) {
      console.error("No class selected");
      return;
    }
  
    try {
      // Query to find the document for this class
      const docQuery = query(collection(db, "studentclassidgrade"), where("classId", "==", selectedClass));
      const querySnapshot = await getDocs(docQuery);
  
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;  // Reference to the document
  
        // Prepare updated grades
        let updatedGrades = {};
        studentsData.forEach(student => {
          updatedGrades[student.AM] = student.grade;
        });
  
        // Update the document
        await updateDoc(docRef, {
          grades: updatedGrades
        });
  
        setIsSubmissionSuccessful(true);
        console.log("Grades updated successfully");

        // Clear local storage after successful submission
        localStorage.removeItem('selectedClass');
        localStorage.removeItem('gradesData');
      } else {
        console.error("No document found for the selected class");
      }
    } catch (error) {
      console.error("Error saving grades: ", error);
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

          <table>
            <thead>
                <tr className={styles['table-header']}>
                    {headers.map((header, index) => (
                        <th className={styles['table-cell']} key={index}>{header.title} </th>
                    ))}
                </tr>
            </thead>
            <tbody>
              {studentsData.map((student, index) => (
                <tr key={index}>
                  <td className={styles['table-cell']}>{student.AM}</td>
                  <td className={styles['table-cell']}>{`${student.firstname} ${student.lastname}`}</td>
                  <td className={styles['table-cell']}>{formatDate(currentDate)}</td>
                  <td className={styles['table-cell']}>{student.department}</td>
                  <td className={styles['table-cell']}>{student.grade}</td> 
                </tr>
              ))}
            </tbody>
          </table>  


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