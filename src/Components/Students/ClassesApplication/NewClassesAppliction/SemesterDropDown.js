import React, { useState } from 'react';
import styles from './NewClassesApplication.module.css';

const SemesterTable = ({ onSelectSemester }) => {
  const [selectedSemester, setSelectedSemester] = useState(1);

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
        className={styles.semesterDropdown}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((semesterNumber) => (
          <option key={semesterNumber} value={semesterNumber}>
            {semesterNumber}o Εξάμηνο
          </option>
        ))}
      </select>
    </div>
  );
};

export default SemesterTable;
