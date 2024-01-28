import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import styles from './DataTable.module.css';
import { HiOutlineEye, HiArrowsUpDown } from 'react-icons/hi2';
import PopUp from './PopUp';
import SearchBar from './SearchBar';
import { filterAndSortData } from './DataTableUtils';
import items from '../../data/dataTableHeaderClasses.json';
import MarkedClassesCounter from './MarkedClasses/MarkedClassesCounter'; 

const TableComponent = ({ showOptionColumn, selectedSemester, pageStyle, submission, collectionName, showmarkedclasses, onMarkedClassesChange  }) => {
  const [info, setInfo] = useState([]);
  const [checkboxes, setCheckboxes] = useState({});
  const [selectedClass, setSelectedClass] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSortedData = filterAndSortData(
    info,
    submission,
    selectedSemester,
    checkboxes,
    sortColumn,
    sortOrder,
    searchQuery
  );

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
      const classesCollection = collection(db, collectionName);
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
      if (submission) {
        onMarkedClassesChange(updatedCheckboxes);
      }
      // const localStorageKey = submission ? 'markedClasses' : 'objectGreeting';
      const localStorageKey = 'objectGreeting';

      const myObjectString = JSON.stringify(updatedCheckboxes);
      localStorage.setItem(localStorageKey, myObjectString);
      // localStorage.setItem('objectGreeting', myObjectString);

      return updatedCheckboxes;
    });
  };

  const openPopup = (collectionName) => {
    setSelectedClass(collectionName);
  };

  const closePopup = () => {
    setSelectedClass(null);
  };

  const toggleSortOrder = (column) => {
    setSortColumn(column);
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };



  return (
    <div className={`${styles['table-container']} ${pageStyle.tablecontainer2}`} >
      {showmarkedclasses && <MarkedClassesCounter markedClassesCount={Object.values(checkboxes).filter((isChecked) => isChecked).length} />}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} pageStyle={pageStyle} />
      <table className={styles.table}>
        <thead>
          <tr className={styles['table-header']}>
            {showOptionColumn && <th className={styles['table-cell']}>Επιλογή</th>}
            {items.map((field, index) => (
              <th key={index} className={`${styles['table-cell']} ${field.collectionfield === 'checkbox' ? styles.checkbox : ''}`} onClick={() => field.collectionfield !== 'checkbox' && toggleSortOrder(field.collectionfield)}>
                {field.title} {field.collectionfield !== 'checkbox' && <HiArrowsUpDown className={styles.icon} />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {collectionName === 'classes' && filteredAndSortedData.map((collectionName, index) => (
  <tr key={index} className={`${styles['table-row']} ${selectedClass === collectionName ? 'clicked' : ''}`}>
    {showOptionColumn && (
      <td className={styles.checkbox}>
        <input
          type="checkbox"
          checked={checkboxes[collectionName.id] || false}
          onChange={(e) => handleCheckboxChange(collectionName.id, e.target.checked)}
        />
      </td>
    )}
    {items.map((field, fieldIndex) => (
      <td key={fieldIndex} className={`${styles['table-cell']} ${styles[field.collectionfield]}`}>
        {field.collectionfield === 'details' ? (
          <div className={styles.eye} onClick={() => openPopup(collectionName)}>
            <HiOutlineEye />
          </div>
        ) : (
          String(collectionName[field.collectionfield])
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

export default TableComponent;