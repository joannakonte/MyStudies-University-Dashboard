import React, {useState, useEffect} from 'react';
import headers from '../../../../data/dataTableHeaderGradesStep2.json'
import styles from './NewGrades2.module.css'; 
import { db } from '../../../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const GradesTable = ({professorId, classId}) => {
    const [gradesData, setGradesData] = useState([]);

    useEffect(() => {
        const fetchGradesAndStudents = async () => {
            const gradesQuery = query(collection(db, "studentclassidgrades"), where("classId", "==", classId));
            const gradesSnapshot = await getDocs(gradesQuery);
    
            for (const gradeDoc of gradesSnapshot.docs) {
                const gradesMap = gradeDoc.data().grade;
    
                // Check if gradesMap exists and is an object
                if (gradesMap && typeof gradesMap === 'object') {
                    for (const [studentId, studentGrade] of Object.entries(gradesMap)) {
                        console.log(`Student ID: ${studentId}, Grade: ${studentGrade}`); // Print each student ID and grade
    
                        const studentQuery = query(collection(db, "students"), where("sdi", "==", studentId));
                        const studentSnapshot = await getDocs(studentQuery);
    
                        if (!studentSnapshot.empty) {
                            const studentInfo = studentSnapshot.docs[0].data();
    
                            // Combine grade data with student info and update state
                            setGradesData(prevData => [...prevData, { studentId, studentGrade, ...studentInfo }]);
                        }
                    }
                }
            }
        };
    
        fetchGradesAndStudents();
    }, [classId]);
      

    return (
        <table>
            <thead>
                <tr className={styles['table-header']}>
                    {headers.map((header, index) => (
                        <th key={index}>{header.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
    );
};

export default GradesTable;