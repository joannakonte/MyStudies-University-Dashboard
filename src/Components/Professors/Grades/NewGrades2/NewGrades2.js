import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import headers from '../../../../data/dataTableHeaderGradesStep2.json'
import Popup from 'reactjs-popup';
import styles from './NewGrades2.module.css'; 
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import ProcessBar from '../ProcessBar/ProcessBar';
import { HiChevronRight, HiChevronLeft, HiExclamationTriangle } from 'react-icons/hi2';
import { addDoc, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase'; 

function NewGrades2() {
  const stages = ['Επιλογή Μαθήματος', 'Καταχώρηση Βαθμολογίας ', 'Υποβολή Βαθμολογίας'];
  const department = "Τμήμα Πληροφορικής και Τηλεπικοινωνιών";
  const [className, setClassName] = useState("");
  const location = useLocation();
  const [selectedClass, setSelectedClass] = useState('');
  const [studentsData, setStudentsData] = useState([]); // State to store students data

  // Current date for display purposes
  const currentDate = new Date();
  const formatDate = (date) => {
    const currentMonthIndex = date.getMonth();
    const season = (currentMonthIndex >= 9 || currentMonthIndex < 2) ? 'Χειμερινό Εξάμηνο' : 'Εαρινό Εξάμηνο';
    const year = (currentMonthIndex < 2) ? date.getFullYear() - 1 : date.getFullYear();

    return `${season} ${year}`;
  };
  useEffect(() => {
    // Retrieve the selectedClass from localStorage
    const storedSelectedClass = localStorage.getItem('selectedClass');
    if (storedSelectedClass) {
      setSelectedClass(storedSelectedClass);
      fetchClassNameAndCreateGradesDoc(storedSelectedClass); // Fetch class info from Firestore
    }
  }, []);

  // Fetch the class name and create grades document
  const fetchClassNameAndCreateGradesDoc = async (classId) => {
    await fetchClassName(classId);
    const students = await createGradesDocument(classId);
    setStudentsData(students); // Set the students data
  };

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

  // ============== | Create new document in database | ============== //
  const createGradesDocument = async (classId) => {
    if (!classId) {
      console.error("classId is undefined, cannot create grades document");
      return;
    }

    try {
      // Check if a document for this class already exists
      const existingDocQuery = query(collection(db, "studentclassidgrade"), where("classId", "==", classId));
      const existingDocSnapshot = await getDocs(existingDocQuery);

      if (!existingDocSnapshot.empty) {
        console.log("Grades document for this class already exists");
        // return; // Exit if document already exists
      }

      // Query to find students for the class
      const studentsQuery = query(collection(db, "students"), where("type", "==", "student"), where("classes", "array-contains", classId));
      const studentsSnapshot = await getDocs(studentsQuery);

      // Initialize grades object
      let grades = {};
      studentsSnapshot.docs.forEach(doc => {
        const studentInfo = doc.data();
        grades[studentInfo.AM] = 0; // Default grade
      });

      // Create new document in studentclassidgrade collection
      const newGradesDoc = {
        classId: classId,
        grades: grades
      };

      await addDoc(collection(db, "studentclassidgrade"), newGradesDoc);
      console.log("New grades document created successfully");
    } catch (error) {
      console.error("Error creating grades document: ", error);
    }

    // Fetch students for the class
    const studentsQuery = query(collection(db, "students"), where("type", "==", "student"), where("classes", "array-contains", classId));
    const studentsSnapshot = await getDocs(studentsQuery);
    console.log("Students snapshot:", studentsSnapshot.docs.map(doc => doc.data())); // Debugging line


    // Create an array to store students data
    let students = [];
    if (!studentsSnapshot.empty) {
      studentsSnapshot.docs.forEach(doc => {
        const studentInfo = doc.data();
        students.push({ ...studentInfo, grade: 0 }); // Include default grade
      });
    }

    return students; // Return the students array
  }


  // ================= | Check if all students have been graded | ================= //

  const [isAllGraded, setIsAllGraded] = useState(true); 
  const navigate = useNavigate();

  // Function to handle grade input changes
  const handleGradeChange = (e, studentAM) => {
    const gradeValue = e.target.value === "" ? null : parseInt(e.target.value);
    const updatedStudentsData = studentsData.map(student => {
      if (student.AM === studentAM) {
        return { ...student, grade: gradeValue };
      }
      return student;
    });
    setStudentsData(updatedStudentsData);
  };

  // Function to check if all students are graded
  const checkAllGraded = () => {
    const ungraded = studentsData.some(student => student.grade === null);
  
    if (ungraded) {
      setIsAllGraded(false); // Will show the popup
    } else {
      setIsAllGraded(true);
      localStorage.setItem('gradesData', JSON.stringify(studentsData));
      navigate('/home/professor-grades/new-grade1/new-grade2/new-grade3');
    }
  };  

  // Close the popup and reset state
  const handleClosePopup = () => {
    setIsAllGraded(true);
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
          <ProcessBar stages={stages} currentStage={1} />

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
              {studentsData && studentsData.map((student, index) => (
                <tr key={index}>
                  <td className={styles['table-cell']}>{student.AM}</td>
                  <td className={styles['table-cell']}>{`${student.firstname} ${student.lastname}`}</td>
                  <td className={styles['table-cell']}>{formatDate(currentDate)}</td>
                  <td className={styles['table-cell']}>{student.department}</td>
                  <td className={styles['table-cell']}>
                    <input
                      className={styles.inputField}
                      type="number"
                      value={student.grade}
                      onChange={(e) => handleGradeChange(e, student.AM)}
                      max="10"
                      min="0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
        </table>

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