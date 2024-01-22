import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import styles from './DataTable.module.css';
import { HiMiniPencil, HiArrowDownTray, HiArrowsUpDown, HiOutlineEye } from 'react-icons/hi2';
import PopUp from './PopUp';
import { filterAndSortDataNew, findStudentById, formatDate } from './DataTableUtils';
import items from '../../data/dataTablegradesProfessorHeader.json';

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
                        <HiArrowDownTray style={{ fontSize: '24px', cursor: 'pointer', left: '25%', paddingRight: '15%' }} />
                        {/* Use handleEyeClick for the eye icon */}
                        <HiOutlineEye
                          onClick={() => handleEyeClick(rowData)}
                          style={{ fontSize: '24px', cursor: 'pointer' }}
                        />
                      </>
                    )
                  ) : field.collectionfield === 'submission' ? (
                    'himinipecin'
                  ) : field.collectionfield === 'details' ? (
                    <HiOutlineEye />
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
