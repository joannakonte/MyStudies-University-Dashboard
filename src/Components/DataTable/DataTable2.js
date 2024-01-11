import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, collectionGroup, getDocs } from 'firebase/firestore';
import styles from './DataTable.module.css';
import { HiArrowsUpDown } from 'react-icons/hi2';
import PopUp from './PopUp';
import SearchBar from './SearchBar';
import { filterAndSortData2 } from './DataTableUtils';
import item_classes from '../../data/dataTableHeaderClasses.json';
import item_grades from '../../data/dataTableHeaderGrades.json';

const TableComponent2 = ({ showOptionColumn, pageStyle, submission, grade, applicationId }) => {
  const [info, setInfo] = useState([]);
  const [checkboxes, setCheckboxes] = useState({});
  const [selectedClass, setSelectedClass] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');

  const items = grade ? item_grades : item_classes;
  const filteredItems = items.filter((field) => field.collectionfield !== 'details');

  const filteredAndSortedData = filterAndSortData2(
    info, submission, checkboxes,
    sortColumn, sortOrder, searchQuery
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const applicationDocRef = doc(db, 'applications', applicationId);
        const applicationDoc = await getDoc(applicationDocRef);

        if (applicationDoc.exists()) {
          const applicationData = applicationDoc.data();

          if (applicationData.studentId === '2a5iiuGDHgvDPwBkVoAk') {
            const classIdsToCheck = applicationData.allclasses.map(cls => cls.class_id);
            console.log('Check for:', classIdsToCheck);

            const classesCollection = collectionGroup(db, 'classes');
            const classesSnapshot = await getDocs(classesCollection);

            const classesData = classesSnapshot.docs.map(doc => doc.data());

            const matchingDocuments = classesData
              .filter(item => classIdsToCheck.includes(item.id))
              .map(item => ({
                ...item,
                grade: applicationData.allclasses.find(cls => cls.class_id === item.id)?.grade || -1,
              }));

            console.log('Matching Documents:', matchingDocuments);
            setInfo(matchingDocuments);
          } else {
            console.log('Student ID does not match. No documents printed.');
          }
        } else {
          console.log('Document not found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

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
            {filteredItems.map((field, index) => (
              <th key={index} className={`${styles['table-cell']} ${field.collectionfield === 'checkbox' ? styles.checkbox : ''}`} onClick={() => field.collectionfield !== 'checkbox' && toggleSortOrder(field.collectionfield)}>
                {field.title} {field.collectionfield !== 'checkbox' && <HiArrowsUpDown className={styles.icon} />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedData.map((application, index) => (
            <tr key={index}>
              {showOptionColumn && (
                <td className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={checkboxes[application.id] || false}
                    onChange={(e) => handleCheckboxChange(application.id, e.target.checked)}
                  />
                </td>
              )}
              {filteredItems.map((field, fieldIndex) => (
                <td key={fieldIndex} className={`${styles['table-cell']} `}>
                  {field.collectionfield === 'allclasses' && application.allclasses ? (
                    <div>
                      {application.allclasses.map((classInfo, classIndex) => (
                        <div key={classIndex} onClick={() => setSelectedClass(classInfo.class_id)}>
                          {`Class ID: ${classInfo.class_id}, Grade: ${classInfo.grade}`}
                        </div>
                      ))}
                    </div>
                  ) : (
                    String(application[field.collectionfield])
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* {selectedClass && <PopUp isOpen={!!selectedClass} onClose={() => setSelectedClass(null)} selectedClass={selectedClass} />} */}
    </div>
  );
};

export default TableComponent2;