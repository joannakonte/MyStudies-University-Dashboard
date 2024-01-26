import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import styles from './DataTable.module.css';
import { HiMiniPencil, HiArrowDownTray, HiArrowsUpDown, HiOutlineEye } from 'react-icons/hi2';
import { HiOutlineArrowRight } from 'react-icons/hi';
import PopUp from './PopUp';
import { filterAndSortDataNew, findStudentById, formatDate } from './DataTableUtils';
import items from '../../data/dataTablegradesProfessorHeader.json';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { IoMdDocument } from 'react-icons/io';


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
      console.log('classesData:', classesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const formatDateCell = (fieldName, fieldValue) => {
    if (fieldName === 'subdate' || fieldName === 'createdate') {
      return fieldValue ? formatDate(fieldValue) : '';
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
      console.log('classId', classId);

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
      console.log('classId', classId);

      localStorage.setItem('selectedClass', classId);

      navigate('/home/professor-grades/view-grades');
    } else {
      console.error('No class selected or classId is missing in selectedClass');

    }
  };

  const [studentsData, setStudentsData] = useState([]); 

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

        console.log("students:", students);

        setStudentsData(students);
      }
    } catch (error) {
      console.error("Error fetching grades data: ", error);
    }
  };

  const handleDownload = async (selectedClass, format) => {
    console.error('selectedClass.className: ', selectedClass.className);

    // Fetch grades data for the selected class
    const classId = selectedClass.classId;
    const docQuery = query(collection(db, 'studentclassidgrade'), where('classId', '==', classId));

    try {
      const querySnapshot = await getDocs(docQuery);

      if (!querySnapshot.empty) {
        const gradesData = querySnapshot.docs[0].data().grades;

        // Query to find students for the class
        const studentsQuery = query(
          collection(db, 'students'),
          where('type', '==', 'student'),
          where('classes', 'array-contains', classId)
        );

        const studentsSnapshot = await getDocs(studentsQuery);

        // Create an array to store students' data with grades
        let students = [];
        if (!studentsSnapshot.empty) {
          studentsSnapshot.docs.forEach((doc) => {
            const studentInfo = doc.data();
            const grade = gradesData[studentInfo.AM] || 0;
            students.push({ ...studentInfo, grade });
          });
        }

        // Generate content based on students' data
        if (format === 'pdf') {
          // Generate PDF content
          const pdf = new jsPDF();
          const tableData = students.map((student) => [`${student.AM}`, `${student.grade}`]);
          pdf.autoTable({
            head: [['AM', 'Grade']], // Table header
            body: tableData, // Table rows
            startY: 20, // Y position from the top
          });
          pdf.save(`${selectedClass.className}.pdf`);
        } else if (format === 'excel') {
          // Generate Excel content
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
                        <HiMiniPencil
                          onClick={() => handlePencilClick(index, rowData)}
                          style={{
                            fontSize: '24px',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            cursor: 'pointer',
                          }}
                        />
                      </div>
                    ) : (
                      <>
                        <button className={styles.download_button} onClick={() => handleDownload(rowData, 'pdf')}>
                          <HiArrowDownTray />  PDF
                        </button>
                        <button className={styles.download_button} onClick={() => handleDownload(rowData, 'excel')}>
                          <HiArrowDownTray />  Excel
                        </button>

                        {/* Use handleEyeClick for the eye icon */}
                        <button className={styles.circle} onClick={() => handleEyeClick(rowData)}>

                          <HiOutlineArrowRight 
                            // onClick={() => handleEyeClick(rowData)}
                            // style={{ fontSize: '24px', cursor: 'pointer' }}
                          />
                        </button>
                      </>
                    )
                  ) : field.collectionfield === 'submission' ? (
                    'himinipecin'
                  ) : field.collectionfield === 'details' ? (
                    <HiOutlineArrowRight  />
                  ) : (
                    formatDateCell(field.collectionfield, rowData[field.collectionfield])
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponentProfessorClasses;
