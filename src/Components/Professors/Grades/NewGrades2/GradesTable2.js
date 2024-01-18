import React, {useState, useEffect} from 'react';
import headers from '../../../../data/dataTableHeaderGradesStep2.json'
import styles from './NewGrades2.module.css'; 
import { db } from '../../../../firebase';
import { doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';

const GradesTable = ({professorId, classId}) => {
    const [gradesData, setGradesData] = useState([]);

    const fetchGradesAndStudents = async () => {
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

    // Save grades
    // const saveGrades = async () => {
    //     try {
    //         // Fetch the document ID of the class grades document
    //         const gradesQuery = query(collection(db, "studentclassidgrade"), where("classId", "==", classId));
    //         const gradesSnapshot = await getDocs(gradesQuery);
    
    //         if (!gradesSnapshot.empty) {
    //             // Assuming there is only one document per class
    //             const gradeDocId = gradesSnapshot.docs[0].id;
    
    //             // Prepare the updated grades array
    //             const updatedGradesArray = gradesData.map(({ studentAM, studentGrade }) => ({ AM: studentAM, grade: studentGrade }));
    
    //             // Get a reference to the document
    //             const gradeDocRef = doc(db, "studentclassidgrade", gradeDocId);
    
    //             // Update the document
    //             await updateDoc(gradeDocRef, {
    //                 grades: updatedGradesArray
    //             });
    
    //             console.log("Grades updated successfully");
    //         } else {
    //             console.log("No document found for the classId");
    //         }
    //     } catch (error) {
    //         console.error("Error updating grades: ", error);
    //     }
    // };
      
    return (
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
                    <td className={styles['table-cell']}></td> 
                    <td className={styles['table-cell']}>Τμήμα {`${grade.department}`}</td> 
                    <td className={styles['table-cell']}>
                    <input 
                        className={styles.inputField}
                        type="number" 
                        max="10"
                        value={grade.studentGrade} 
                        onChange={(e) => handleGradeChange(grade.studentAM, e.target.value)}
                    />
                    </td>
                </tr>
            ))}
                
            </tbody>
        </table>
    );
};

export default GradesTable;