import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import styles from './DataTable.module.css';
import { HiMiniPencil, HiArrowDownTray, HiArrowsUpDown, HiArrowUturnRight } from 'react-icons/hi2';
import { filterAndSortDataNew, findStudentById, formatDate } from './DataTableUtils';
import items from '../../data/dataTablegradesProfessorHeader.json';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';


const TableComponentProfessorClasses = ({ collectionName }) => {
  const [info, setInfo] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [collectionName]);

  useEffect(() => {
    const updatedFilteredData = filterAndSortDataNew(info, sortColumn, sortOrder, searchQuery);
    setFilteredAndSortedData(updatedFilteredData);
  }, [info, sortColumn, sortOrder, searchQuery]);

  const fetchData = async () => {
    try {
      const professorId = await findStudentById();
      const classesCollection = collection(db, collectionName);
      const q = query(classesCollection, where('professorId', '==', professorId));
      const querySnapshot = await getDocs(q);
      const classesData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        data.department = data.department || 'Τμήμα Πληροφορικής και Τηλεπικοινωνιών';
        return data;
      });

      setInfo(classesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const formatDateCell = (fieldName, fieldValue) => {
    if (fieldName === 'subdate' || fieldName === 'createdate') {
      return fieldValue && fieldValue !== '-' ? formatDate(fieldValue) : '-';
    } else {
      return String(fieldValue);
    }
  };

  const toggleSortOrder = (column) => {
    setSortColumn(column);
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handlePencilClick = (index, selectedClass) => {
    setSelectedRow(index);
    setSelectedClass(selectedClass);

    if (selectedClass && selectedClass.classId) {
      const classId = selectedClass.classId;
      localStorage.setItem('selectedClass', classId);
      navigate('/home/professor-grades/new-grade1/new-grade2');
    } else {
      console.error('No class selected or classId is missing in selectedClass');
    }
  };

  const handleEyeClick = (selectedClass) => {
    setSelectedClass(selectedClass);

    if (selectedClass && selectedClass.classId) {
      const classId = selectedClass.classId;
      localStorage.setItem('selectedClass', classId);
      navigate('/home/professor-grades/view-grades');
    } else {
      console.error('No class selected or classId is missing in selectedClass');
    }
  };

  const [studentsData, setStudentsData] = useState([]);

  const fetchGradesData = async (classId) => {
    const docQuery = query(collection(db, "studentclassidgrade"), where("classId", "==", classId));
    try {
      const querySnapshot = await getDocs(docQuery);
      if (!querySnapshot.empty) {
        const gradesData = querySnapshot.docs[0].data().grades;

        const studentsQuery = query(collection(db, "students"), where("type", "==", "student"), where("classes", "array-contains", classId));
        const studentsSnapshot = await getDocs(studentsQuery);

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

  const handleDownload = async (selectedClass, format) => {
    const classId = selectedClass.classId;
    const docQuery = query(collection(db, 'studentclassidgrade'), where('classId', '==', classId));

    try {
      const querySnapshot = await getDocs(docQuery);

      if (!querySnapshot.empty) {
        const gradesData = querySnapshot.docs[0].data().grades;

        const studentsQuery = query(
          collection(db, 'students'),
          where('type', '==', 'student'),
          where('classes', 'array-contains', classId)
        );

        const studentsSnapshot = await getDocs(studentsQuery);

        let students = [];
        if (!studentsSnapshot.empty) {
          studentsSnapshot.docs.forEach((doc) => {
            const studentInfo = doc.data();
            const grade = gradesData[studentInfo.AM] || 0;
            students.push({ ...studentInfo, grade });
          });
        }

        if (format === 'pdf') {
          const pdf = new jsPDF();
          const tableData = students.map((student) => [`${student.AM}`, `${student.grade}`]);
          pdf.autoTable({
            head: [['AM', 'Grade']],
            body: tableData,
            startY: 20,
          });
          pdf.save(`${selectedClass.className}.pdf`);
        } else if (format === 'excel') {
          const ws = XLSX.utils.aoa_to_sheet([['AM', 'Grade'], ...students.map((student) => [`${student.AM}`, `${student.grade}`])]);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
          XLSX.writeFile(wb, `${selectedClass.className}.xlsx`);
        }
      }
    } catch (error) {
      console.error('Error fetching or processing data: ', error);
    }
  };

  return (
    <div className={`${styles['table-container']} ${styles['certif']}`}>
      {filteredAndSortedData.length === 0 ? (
        <p>No classes found.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr className={styles['table-header']}>
              {items.map((field, index) => (
                <th key={index} className={`${styles['table-cell']} `} onClick={() => toggleSortOrder(field.collectionfield)}>
                  {field.title} {<HiArrowsUpDown className={styles.icon} />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.map((rowData, index) => (
              <tr
                key={index}
                style={{
                  color: rowData.finalSubmission === false ? 'orange' : 'inherit',
                  backgroundColor: index === selectedRow ? 'lightblue' : 'transparent',
                }}
              >
                {items.map((field, fieldIndex) => (
                  <td
                    key={fieldIndex}
                    className={`${styles['table-cell']} ${styles[field.collectionfield]}`}
                    style={{ position: 'relative' }}
                  >
                    {field.collectionfield === 'finalSubmission' ? (
                      rowData.finalSubmission === false ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <span className={styles.situation}>Επεξεργασία</span>
                          <span className={styles.seperate}>|</span>
                          <HiMiniPencil
                            onClick={() => handlePencilClick(index, rowData)}
                            className={styles.pencil}
                          />
                        </div>
                      ) : (
                        <>
                          <span className={styles.situation}>Οριστικοποιήθηκε</span>
                          <span className={styles.seperate}>|</span>
                          <button className={styles.download_button} onClick={() => handleDownload(rowData, 'pdf')}>
                            <HiArrowDownTray className={styles.icon_h2} /> PDF
                          </button>

                          <button className={styles.download_button} onClick={() => handleDownload(rowData, 'excel')}>
                            <HiArrowDownTray className={styles.icon_h2} /> Excel
                          </button>

                          <button className={styles.circle} onClick={() => handleEyeClick(rowData)}>
                            <HiArrowUturnRight className={styles.icon_h2} />
                          </button>
                        </>
                      )
                    ) : field.collectionfield === 'submission' ? (
                      'himinipecin'
                    ) : field.collectionfield === 'details' ? (
                      <HiArrowUturnRight />
                    ) : (
                      formatDateCell(field.collectionfield, rowData[field.collectionfield])
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableComponentProfessorClasses;
