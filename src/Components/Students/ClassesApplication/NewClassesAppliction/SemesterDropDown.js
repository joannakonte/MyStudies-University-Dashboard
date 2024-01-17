import React, { useState, useEffect } from 'react';
import styles from './NewClassesApplication.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const SemesterTable = ({ onSelectSemester }) => {
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [allowedSemesters, setAllowedSemesters] = useState([]);

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const semestersToShow = currentMonth >= 8 || currentMonth <= 1 ? [1, 3, 5, 7] : [2, 4, 6, 8];

    setAllowedSemesters(semestersToShow);
  }, []); 

  const handleSemesterChange = (event) => {
    const semesterNumber = parseInt(event.target.value, 10);
    setSelectedSemester(semesterNumber);
    onSelectSemester(semesterNumber);
  };

  return (
    <div className={styles.semesterDropdownContainer}>
      <select
        id="semester"
        value={selectedSemester}
        onChange={handleSemesterChange}
        className={styles['dropdown-select']}
      >
        {allowedSemesters.map((semesterNumber) => (
          <option key={semesterNumber} value={semesterNumber}>
            {semesterNumber}o Εξάμηνο
          </option>
        ))}
      </select>
      <FontAwesomeIcon icon={faAngleDown} className={styles['select-arrow']}/>
    </div>
  );
};

export default SemesterTable;
