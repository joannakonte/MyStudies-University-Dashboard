import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import styles from './DataTable.module.css';
import { HiArrowDownTray, HiArrowsUpDown, HiOutlineEye } from 'react-icons/hi2';
import PopUp from './PopUp';
import { filterAndSortDataNew, findStudentById, formatDate } from './DataTableUtils';
import items from "../../data/dataTableHeaderProfessorClasses.json";

const TableComponentProfessorClasses = ({ collectionName }) => {
  const [info, setInfo] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    fetchData();
  }, [collectionName]);

  useEffect(() => {
    const updatedFilteredData = filterAndSortDataNew(
      info,
      sortColumn,
      sortOrder,
      searchQuery
    );
    setFilteredAndSortedData(updatedFilteredData);
  }, [info, sortColumn, sortOrder, searchQuery]);

  const fetchData = async () => {
    try {
      const professorId = await findStudentById();
  
      const classesCollection = collection(db, collectionName);
      const q = query(classesCollection);
      const querySnapshot = await getDocs(q);
      const classesData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        data.department = data.department || 'Τμήμα Πληροφορικής και Τηλεπικοινωνιών';
        return data;
      });
  
      setInfo(classesData);
      console.log('Data:', classesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const formatDateCell = (fieldName, fieldValue) => {
    if (fieldName === 'reqdate') {
      return formatDate(fieldValue);
    } else {
      return String(fieldValue);
    }
  };

  const toggleSortOrder = (column) => {
    setSortColumn(column);
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const openPopup = (selectedClass) => {
    setSelectedClass(selectedClass);
  };

  const closePopup = () => {
    setSelectedClass(null);
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
            <tr key={index} className={`${styles['table-row']}`}>
              {items.map((field, fieldIndex) => (
                <td key={fieldIndex} className={`${styles['table-cell']} ${styles[field.collectionfield]}`}>
                  {(
                    field.collectionfield === 'hours' ? (
                      rowData.details && rowData.details.map((details, detailIndex) => (
                        <div key={detailIndex}>{details.hours}</div>
                      ))
                    ) : (
                      field.collectionfield === 'details' ? (
                        <div className={styles.eye} onClick={() => openPopup(rowData)}>
                          <HiOutlineEye />
                        </div>
                      ) : (
                        formatDateCell(field.collectionfield, rowData[field.collectionfield])
                      )
                    )
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <PopUp isOpen={!!selectedClass} onClose={closePopup} selectedClass={selectedClass} />
    </div>
  );
};

export default TableComponentProfessorClasses;
