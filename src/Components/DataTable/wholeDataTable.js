import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import styles from './DataTable.module.css';
import { HiOutlineEye, HiArrowsUpDown, HiMagnifyingGlass } from 'react-icons/hi2';
import PopUp from './PopUp';

const TableComponent = ({ showOptionColumn, selectedSemester, pageStyle, submission }) => {
  const [info, setInfo] = useState([]);
  const [checkboxes, setCheckboxes] = useState({});
  const [selectedClass, setSelectedClass] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');

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
      const myObjectString = JSON.stringify(updatedCheckboxes);
      localStorage.setItem('objectGreeting', myObjectString);
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

  const getSortedData = () => {
    if (sortColumn) {
      return [...info].sort((a, b) => {
        const columnA = a[sortColumn];
        const columnB = b[sortColumn];

        if (typeof columnA === 'string') {
          return sortOrder === 'asc' ? columnA.localeCompare(columnB) : columnB.localeCompare(columnA);
        } else {
          return sortOrder === 'asc' ? columnA - columnB : columnB - columnA;
        }
      });
    } else {
      return info;
    }
  };

const filterAndSortData = () => {
  const filteredData = info.filter((classes) => {
    const { name, ECTS, semester, category } = classes;
    const normalizedQuery = searchQuery.toLowerCase();

    if (submission) {
      return (
        name.toLowerCase().includes(normalizedQuery) ||
        ECTS.toString().includes(normalizedQuery) ||
        category.toLowerCase().includes(normalizedQuery)
      );
    } else {
      const semesterMatch = selectedSemester.toString() === '' || semester.toString() === selectedSemester.toString();
      return (
        semesterMatch &&
        (name.toLowerCase().includes(normalizedQuery) ||
          ECTS.toString().includes(normalizedQuery) ||
          category.toLowerCase().includes(normalizedQuery))
      );
    }
  });

  if (submission) {
    const markedClasses = filteredData.filter((classes) => checkboxes[classes.id]);

    return markedClasses.sort((a, b) => {
      const columnA = a[sortColumn];
      const columnB = b[sortColumn];

      if (typeof columnA === 'string') {
        return sortOrder === 'asc' ? columnA.localeCompare(columnB) : columnB.localeCompare(columnA);
      } else {
        return sortOrder === 'asc' ? columnA - columnB : columnB - columnA;
      }
    });
  } else {
    return filteredData.sort((a, b) => {
      const columnA = a[sortColumn];
      const columnB = b[sortColumn];

      if (typeof columnA === 'string') {
        return sortOrder === 'asc' ? columnA.localeCompare(columnB) : columnB.localeCompare(columnA);
      } else {
        return sortOrder === 'asc' ? columnA - columnB : columnB - columnA;
      }
    });
  }
};



  return (
    <div className={`${styles['table-container']} ${pageStyle.tablecontainer}`}>
      <div className={`${styles['search-bar']} ${pageStyle.searchbar}`}>
        <div className={`${styles['searchiconcontainer']} ${pageStyle.searchiconcontainer}`}>
          <HiMagnifyingGlass className={`${styles['searchicon']} ${pageStyle.searchicon}`} />
        </div>
        <input
          type="text"
          className={`${styles['searchinput']} ${pageStyle.searchinput}`}
          placeholder="Αναζήτησε Μάθημα, Εξάμηνο, Κατηγορία ή ECTS"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
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
          {filterAndSortData().map((classes, index) => (
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

  const tableFields = [
    {
      "title": "Επιλογή",
      "collectionfield": "checkbox"
    },
    {
      "title": "Μαθήμα",
      "collectionfield": "name"
    },
    {
      "title": "ECTS",
      "collectionfield": "ECTS"
    },
    {
      "title": "Κατηγορία",
      "collectionfield": "category"
    },
    {
      "title": "Κωδικός",
      "collectionfield": "id"
    },
    {
      "title": "Εξάμηνο",
      "collectionfield": "semester"
    },
    {
      "title": "Λέπτομέρειες",
      "collectionfield": "details"
    },
  ];

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
            {showOptionColumn && (
              <th className={`${styles['table-cell']} ${styles.checkbox}`} onClick={() => toggleSortOrder('checkbox')}>
                Επιλογή {<HiArrowsUpDown className={styles.icon} />}
              </th>
            )}
            {tableFields.map((field, index) => (
              <th key={index} className={`${styles['table-cell']} ${field.collectionfield === 'checkbox' ? styles.checkbox : ''}`} onClick={() => field.collectionfield !== 'checkbox' && toggleSortOrder(field.collectionfield)}>
                {field.title} {field.collectionfield !== 'checkbox' && <HiArrowsUpDown className={styles.icon} />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedData.map((classes, index) => (
            <tr key={index} className={`${styles['table-row']} ${selectedClass === classes ? 'clicked' : ''}`}>
              {showOptionColumn && (
                <td className={`${styles['table-cell']} ${styles.checkbox}`}>
                  <input
                    type="checkbox"
                    checked={checkboxes[classes.id] || false}
                    onChange={(e) => handleCheckboxChange(classes.id, e.target.checked)}
                  />
                </td>
              )}
              {tableFields.map((field, fieldIndex) => (
                <td key={fieldIndex} className={`${styles['table-cell']} ${field.collectionfield === 'checkbox' ? styles.checkbox : ''}`}>
                  {field.collectionfield === 'checkbox' ? (
                    <input
                      type="checkbox"
                      checked={checkboxes[classes.id] || false}
                      onChange={(e) => handleCheckboxChange(classes.id, e.target.checked)}
                    />
                  ) : (
                    field.collectionfield === 'details' ? (
                      <div className={styles.eye} onClick={() => openPopup(classes)}>
                        <HiOutlineEye />
                      </div>
                    ) : (
                      String(classes[field.collectionfield]) // Convert to string or render properties individually
                    )
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {showOptionColumn && (
        <PopUp isOpen={!!selectedClass} onClose={closePopup} selectedClass={selectedClass} />
      )}
      {selectedClass && (
        <div className={styles['selected-class-details']}>
          <h3>Selected Class Details</h3>
          {tableFields.map((field, index) => (
            <p key={index}>{field.title}: {field.collectionfield === 'details' ? '' : selectedClass[field.collectionfield]}</p>
          ))}
        </div>
      )}
    </div>
  );
};



