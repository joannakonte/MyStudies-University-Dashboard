import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import styles from './DataTable.module.css';
import { HiOutlineEye, HiArrowsUpDown } from 'react-icons/hi2';
import PopUp from './PopUp';
import SearchBar from './SearchBar';
import filterAndSortData from './DataTableUtils';

const TableComponent = ({ showOptionColumn, selectedSemester, pageStyle, submission }) => {
  const [info, setInfo] = useState([]);
  const [checkboxes, setCheckboxes] = useState({});
  const [selectedClass, setSelectedClass] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSortedData = filterAndSortData(
    info, submission, selectedSemester, checkboxes,
    sortColumn, sortOrder, searchQuery);

  useEffect(() => {
    fetchData();

    const localStorageContent = localStorage.getItem('objectGreeting');
    if (localStorageContent) {
      const parsedCheckboxes = JSON.parse(localStorageContent);
      setCheckboxes(parsedCheckboxes);
    }
  }, [submission]);

  const fetchData = async () => {
    try {
      const classesCollection = collection(db, 'classes');
      const querySnapshot = await getDocs(classesCollection);
      const classesData = querySnapshot.docs.map((doc) => doc.data());
      setInfo(classesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCheckboxChange = (id, isChecked) => {
    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = {
        ...prevCheckboxes,
        [id]: isChecked,
      };
  
      console.log('Updated Checkboxes:', updatedCheckboxes);
  
      // Use the correct local storage key based on the submission value
      const localStorageKey = submission ? 'markedClasses' : 'objectGreeting';
  
      const myObjectString = JSON.stringify(updatedCheckboxes);
      localStorage.setItem(localStorageKey, myObjectString);
  
      return updatedCheckboxes;
    });
  };
  
  
  const openPopup = (classes) => {
    setSelectedClass(classes);
  };

  const closePopup = () => {
    setSelectedClass(null);
  };

  const toggleSortOrder = (column) => {
    setSortColumn(column);
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className={`${styles['table-container']} `}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} pageStyle={pageStyle} />
      <table className={styles.table}>
        <thead>
          <tr className={styles['table-header']}>
            {showOptionColumn && <th className={styles['table-cell']}>Επιλογή</th>}
            <th className={`${styles['table-cell']} ${styles.class}`} onClick={() => toggleSortOrder('name')}>
              Μαθήμα <HiArrowsUpDown className={styles.icon} />
            </th>
            <th className={`${styles['table-cell']} ${styles.icon}`} onClick={() => toggleSortOrder('ECTS')}>
              ECTS <HiArrowsUpDown className={styles.icon} />
            </th>
            <th className={`${styles['table-cell']} ${styles.icon}`} onClick={() => toggleSortOrder('category')}>
              Κατηγορία <HiArrowsUpDown className={styles.icon} />
            </th>
            <th className={`${styles['table-cell']} ${styles.icon}`} onClick={() => toggleSortOrder('id')}>
              Κωδικός <HiArrowsUpDown className={styles.icon} />
            </th>
            <th className={`${styles['table-cell']} ${styles.icon}`} onClick={() => toggleSortOrder('semester')}>
              Εξάμηνο <HiArrowsUpDown className={styles.icon} />
            </th>
            <th className={styles['table-cell']}>Λεπτομέρειες</th>
          </tr>
        </thead>
        <tbody>
        {filteredAndSortedData.map((classes, index) => (
            <tr key={index} className={`${styles['table-row']} ${selectedClass === classes ? 'clicked' : ''}`}>
              {showOptionColumn && (
                <td className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={checkboxes[classes.id] || false}
                    onChange={(e) => handleCheckboxChange(classes.id, e.target.checked)}
                  />
                </td>
              )}
              <td className={`${styles['table-cell']} ${styles.class}`}>{classes.name}</td>
              <td className={styles['table-cell']}>{classes.ECTS}</td>
              <td className={styles['table-cell']}>{classes.category}</td>
              <td className={styles['table-cell']}>{classes.id}</td>
              <td className={styles['table-cell']}>{classes.semester}</td>
              <td className={styles.eye} onClick={() => openPopup(classes)}>
                <HiOutlineEye />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PopUp isOpen={!!selectedClass} onClose={closePopup} selectedClass={selectedClass} />
      {selectedClass && (
        <div className={styles['selected-class-details']}>
          <h3>Selected Class Details</h3>
          <p>Name: {selectedClass.name}</p>
          <p>ECTS: {selectedClass.ECTS}</p>
          <p>Category: {selectedClass.category}</p>
        </div>
      )}
    </div>
  );
};

export default TableComponent;