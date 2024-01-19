import React, {useState, useEffect} from 'react';
import headers from '../../../../data/dataTableHeaderGradesStep2.json'
import styles from './NewGrades3.module.css'; 
import { db } from '../../../../firebase';
import { collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore';

const GradesTable = ({professorId, classId}) => {
    const [gradesData, setGradesData] = useState([]);
    const firebaseTimestamp = serverTimestamp();
    // Current date for display purposes
    const currentDate = new Date();
    const formatDate = (date) => {
        const currentMonthIndex = date.getMonth();
        const season = (currentMonthIndex >= 9 || currentMonthIndex < 2) ? 'Χειμερινό Εξάμηνο' : 'Εαρινό Εξάμηνο';
        const year = (currentMonthIndex < 2) ? date.getFullYear() - 1 : date.getFullYear();

        return `${season} ${year}`;
    };

    const fetchGradesAndStudents = async () => {
        if (!classId) {
            console.error("classId is undefined, unable to fetch grades");
            return;
        }

        setGradesData([]); // Clear the existing data
        const gradesQuery = query(collection(db, "studentclassidgrade"), where("classId", "==", classId));
        const gradesSnapshot = await getDocs(gradesQuery);

        for (const gradeDoc of gradesSnapshot.docs) {
            const gradesArray = gradeDoc.data().grades; 
    
            if (Array.isArray(gradesArray)) {
                for (const gradeItem of gradesArray) {
                    const studentAM = gradeItem.AM; 
                    const studentGrade = gradeItem.grade;   

                    console.log(`Student AM: ${studentAM}, Grade: ${studentGrade}`); // Print each student ID and grade
    
                    const studentQuery = query(collection(db, "students"), where("AM", "==", studentAM));
                    const studentSnapshot = await getDocs(studentQuery);
    
                    if (!studentSnapshot.empty) {
                        const studentInfo = studentSnapshot.docs[0].data();
                        console.log(`Student AM: ${studentInfo.AM}, Student name: ${studentInfo.firstname}`); 
    
                        // Combine grade data with student info and update state
                        setGradesData(prevData => [...prevData, { studentAM, studentGrade, ...studentInfo }]);
                    }
                }
            }
        }
    };

    useEffect(() => {
        const savedGrades = localStorage.getItem('gradesData');

        if (savedGrades) {
            setGradesData(JSON.parse(savedGrades));
        } else {
            fetchGradesAndStudents();
        }
    }, [classId]);
    
    const handleGradeChange = (studentAM, newGrade) => {
        setGradesData(currentGrades => {
            const updatedGrades = currentGrades.map(grade => 
                grade.studentAM === studentAM ? {...grade, studentGrade: newGrade} : grade
            );

            localStorage.setItem('gradesData', JSON.stringify(updatedGrades));
            return updatedGrades;
        });
    };
      
    return (
        <div className={styles.gradesContainer}>
            <div className={styles.studentCountContainer}>
                <h3 className={styles.studentCount}>Σύνολο Μαθητών: {gradesData.length}</h3>
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
                {gradesData.map((grade, index) => (
                    <tr key={index}>
                        <td className={styles['table-cell']}>{grade.studentAM}</td>
                        <td className={styles['table-cell']}>{`${grade.firstname} ${grade.lastname}`}</td> 
                        <td className={styles['table-cell']}>{formatDate(currentDate)}</td> 
                        <td className={styles['table-cell']}>Τμήμα {`${grade.department}`}</td> 
                        <td className={styles['table-cell']}>{grade.studentGrade}</td>
                    </tr>
                ))}
                    
                </tbody>
            </table>
        </div>
    );
};

export default GradesTable;