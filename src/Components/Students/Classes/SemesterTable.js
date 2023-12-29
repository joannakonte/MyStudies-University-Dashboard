import React, { useState } from 'react';
import styles from './Classes.module.css';

const SemesterTable = ({ onSelectSemester }) => {
  const [clickedSemester, setClickedSemester] = useState(1);

  const handleSemesterClick = (semesterNumber) => {
    setClickedSemester(semesterNumber);
    onSelectSemester(semesterNumber);
  };

  return (
    <table className={styles.semestertable}>
      <tbody>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((semesterNumber) => (
          <tr
            key={semesterNumber}
            onClick={() => handleSemesterClick(semesterNumber)}
            className={clickedSemester === semesterNumber ? styles.clickedSemester : ''}
          >
            <td>{semesterNumber}o Εξάμηνο</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SemesterTable;
