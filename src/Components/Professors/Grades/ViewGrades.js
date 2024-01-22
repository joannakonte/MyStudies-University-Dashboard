import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ViewGrades.module.css'
import Header from '../Header/Header';
import headers from '../../../data/dataTableHeaderGradesStep2.json'
import Sidebar from '../Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import { HiChevronLeft } from 'react-icons/hi2';
import { where, getDocs, query, collection } from 'firebase/firestore';
import { db } from '../../../firebase'; 

function ViewGrades() {
  const department = "Τμήμα Πληροφορικής και Τηλεπικοινωνιών";
  const [className, setClassName] = useState("");
  const location = useLocation();
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
    if (storedSelectedClass) {
      fetchClassName(storedSelectedClass);  // Fetch the class name
      fetchGradesData(storedSelectedClass); // Fetch grades for the class
    }
  }, []);

  // Fetch the class details based on selectedClass
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
  

  return(
    <div className={styles.wrapper}>
        <div className={styles.header}>
          <Header />
        </div>

        <div className={styles.sidebar}>
          <Sidebar currentPath={location.pathname} />
        </div>

        <div className={styles.main}>

          <div className={styles.infoBox}>
            {department} - {className} - {formatDate(currentDate)}
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
          </div>

          <div className={styles['button-container']}>
            <div className={styles['previous']}>
              <Link to="/home/professor-grades" className={styles['previous-page']}>
                <HiChevronLeft /> Πίσω
              </Link>
            </div>
          </div>
        </div>
    </div>
  );
}
  
export default ViewGrades;