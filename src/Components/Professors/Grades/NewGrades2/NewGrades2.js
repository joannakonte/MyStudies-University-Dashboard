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
import { addDoc, collection, query, where, getDocs, serverTimestamp} from 'firebase/firestore';
import { db } from '../../../../firebase'; 

function NewGrades2() {
  const stages = ['Επιλογή Μαθήματος', 'Καταχώρηση Βαθμολογίας ', 'Υποβολή Βαθμολογίας'];
  const department = "Τμήμα Πληροφορικής και Τηλεπικοινωνιών";
  const [className, setClassName] = useState("");
  const location = useLocation();
  const [studentsData, setStudentsData] = useState([]); // State to store students data

  // Current date for display purposes
  const date = new Date();
  const formatDate = (date) => {
    const currentMonthIndex = date.getMonth();
    const season = (currentMonthIndex >= 9 || currentMonthIndex < 2) ? 'Χειμερινό Εξάμηνο' : 'Εαρινό Εξάμηνο';
    const year = (currentMonthIndex < 2) ? date.getFullYear() - 1 : date.getFullYear();

    return `${season} ${year}`;
  };

  const checkDocumentExistenceAndEditMode = async (classId) => {
    const docQuery = query(collection(db, "studentclassidgrade"), where("classId", "==", classId));
    const querySnapshot = await getDocs(docQuery);
    if (!querySnapshot.empty) {
      const document = querySnapshot.docs[0].data();
      return { exists: true, editMode: document.editMode, finalSubmission: document.finalSubmission };
    }
    return { exists: false };
  };

  useEffect(() => {
    const currentDate = new Date();

    // Fetch the class details based on selectedClass
    const fetchClassDetails = async (classId) => {
      if (classId) {
        const classesQuery = query(collection(db, "classes"), where("id", "==", classId));
        try {
          const querySnapshot = await getDocs(classesQuery);
          if (!querySnapshot.empty) {
            const classData = querySnapshot.docs[0].data();
            setClassName(classData.name);
            const details = {
              semester: classData.semester,
              className: classData.name,
              professorId: classData.professorId
            };
            console.log("Fetched class details:", details);
            return details;
          } else {
            console.log("No such class found for ID:", classId);
            return null;
          }
        } catch (error) {
          console.error("Error fetching class name: ", error);
          return null;
        }
      }
    };

    // Fetch the class name and create grades document
    const fetchClassNameAndCreateGradesDoc = async (classId, classDetails) => {
      if (!classDetails) {
        console.error("Class details are missing");
        return;
      }
    
      const students = await createGradesDocument(classId, classDetails);
      setStudentsData(students); // Set the students data
    }

    // Create new document in database 
    const createGradesDocument = async (classId, classDetails) => {
      if (!classId || !classDetails) {
      console.error("Class ID or class details are missing");
      return;
      }

      try {
        // Query to find students for the class
        const studentsQuery = query(collection(db, "students"), where("type", "==", "student"), where("classes", "array-contains", classId));
        const studentsSnapshot = await getDocs(studentsQuery);

        // If the document does not exist

        // Initialize grades object
        let grades = {};
        studentsSnapshot.docs.forEach(doc => {
          const studentInfo = doc.data();
          grades[studentInfo.AM] = 0; // Default grade
        });

        // Create new document in studentclassidgrade collection
        const newGradesDoc = {
          classId: classId,
          grades: grades,
          editMode: true,
          finalSubmission: true,
          createdate: serverTimestamp(),
          subdate: "-",
          exam: formatDate(currentDate),
          semester: classDetails.semester,
          className: classDetails.className,
          professorId: classDetails.professorId
        };

        await addDoc(collection(db, "studentclassidgrade"), newGradesDoc);
        console.log("New grades document created successfully");

        // Create an array to store students data with default grades
        let students = [];
        if (!studentsSnapshot.empty) {
          studentsSnapshot.docs.forEach(doc => {
            const studentInfo = doc.data();
            students.push({ ...studentInfo, grade: 0 }); // Include default grade
          });
        }
    
        return students;
      } catch (error) {
        console.error("Error creating grades document: ", error);
      }
    }

    // Fetch grades data for edit mode
    const fetchGradesData = async (classId) => {
      const docQuery = query(collection(db, "studentclassidgrade"), where("classId", "==", classId));
      try {
        const querySnapshot = await getDocs(docQuery);
        if (!querySnapshot.empty) {
          const gradesData = querySnapshot.docs[0].data().grades;

          // Query to find students for the class
          const studentsQuery = query(collection(db, "students"), where("type", "==", "student"), where("classes", "array-contains", classId));
          const studentsSnapshot = await getDocs(studentsQuery);

          // Create an array to store students data with default grades
          let students = [];
          if (!studentsSnapshot.empty) {
            studentsSnapshot.docs.forEach(doc => {
              const studentInfo = doc.data();
              students.push({ ...studentInfo, grade: gradesData[studentInfo.AM] || 0 }); 
            });
          }

          setStudentsData(students);
        }
      } catch (error) {
        console.error("Error fetching grades data: ", error);
      }
    }; 

    const init = async () => {
      const storedSelectedClass = localStorage.getItem('selectedClass');
      console.log("selected class: "+ storedSelectedClass);
    
      if (storedSelectedClass) {
        const classDetails = await fetchClassDetails(storedSelectedClass);
        const { exists, editMode, finalSubmission } = await checkDocumentExistenceAndEditMode(storedSelectedClass);
    
        if (exists) {
          console.log("Document exists.");
          if (editMode && !finalSubmission) {
            // Fetch grades from the database when document is in edit mode
            await fetchGradesData(storedSelectedClass);
          } else if (editMode && finalSubmission){
            console.log("Document exists but is not finalized");
            // Check if there are stored grades in localStorage and use them
            const storedGradesData = localStorage.getItem('gradesData');
            if (storedGradesData) {
              const parsedGradesData = JSON.parse(storedGradesData);
              setStudentsData(parsedGradesData);
            } else {
              // If no grades data in localStorage, fetch from database
              await fetchGradesData(storedSelectedClass);
            }
          }
        } else if (!exists) {
          // Document does not exist
          console.log("document does not exist");
          fetchClassNameAndCreateGradesDoc(storedSelectedClass, classDetails);
        }
      }
    };
    
  
    init();
  }, []);
   
  
  // ================= | Check if all students have been graded | ================= //

  const [isAllGraded, setIsAllGraded] = useState(true); 
  const navigate = useNavigate();

  // Function to handle grade input changes
  const handleGradeChange = (e, studentAM) => {
    // Parse the grade, fallback to empty string if NaN
    const gradeValue = e.target.value === "" ? "" : parseInt(e.target.value);
    const updatedStudentsData = studentsData.map(student => {
      if (student.AM === studentAM) {
        return { ...student, grade: isNaN(gradeValue) ? "" : gradeValue };
      }
      return student;
    });
    setStudentsData(updatedStudentsData);
  };  

  // Function to check if all students are graded
  const checkAllGraded = () => {
    const ungraded = studentsData.some(student => student.grade === "" || student.grade === 0);
    
    setIsAllGraded(!ungraded);
    if (!ungraded) {
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
            {department} - {className} - {formatDate(date)}
          </div>

          <div className={styles.gradesContainer}>
            <div className={styles.studentCountContainer}>
                <h3 className={styles.studentCount}>Σύνολο Μαθητών: {studentsData.length}</h3>
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
                    <td className={styles['table-cell']}>{formatDate(date)}</td>
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
        </div>

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