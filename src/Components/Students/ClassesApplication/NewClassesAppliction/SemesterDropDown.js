import React, { useState, useEffect } from 'react';
import styles from './NewClassesApplication.module.css';

const SemesterTable = ({ onSelectSemester }) => {
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [allowedSemesters, setAllowedSemesters] = useState([]);

  useEffect(() => {
    // Get the current month (0-11 where 0 is January and 11 is December)
    const currentMonth = new Date().getMonth();

    // Determine which semesters to display based on the current month
    const semestersToShow = currentMonth >= 8 || currentMonth <= 1 ? [1, 3, 5, 7] : [2, 4, 6, 8];

    setAllowedSemesters(semestersToShow);
  }, []); // Run the effect only once when the component mounts

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
        {allowedSemesters.map((semesterNumber) => (
          <option key={semesterNumber} value={semesterNumber}>
            {semesterNumber}o Εξάμηνο
          </option>
        ))}
      </select>
    </div>
  );
};

export default SemesterTable;
