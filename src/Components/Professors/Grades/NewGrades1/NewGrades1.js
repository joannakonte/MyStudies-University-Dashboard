import React, { useState } from 'react';
import styles from './NewGrades1.module.css'; 
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import ProcessBar from '../ProcessBar/ProcessBar';

function NewGrades1() {
  const stages = ['Επιλογή Μαθήματος', 'Καταχώρηση Βαθμολογίας ', 'Υποβολή Βαθμολογίας'];
  
  const location = useLocation();

  const department = "Τμήμα Πληροφορικής και Τηλεπικοινωνιών";
  const className = "Τμήμα Πληροφορικής και Τηλεπικοινωνιών";
  const period = "ΧΕΙΜ 2024";

  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return(
    <div className={styles.wrapper}>
        <div className={styles.header}>
          <Header />
        </div>

        <div className={styles.sidebar}>
          <Sidebar currentPath={location.pathname} />
        </div>

        <div className={styles.main}>
          <ProcessBar stages={stages} currentStage={0} />

          <div className={styles.infoBox}>
            {department} - {className} - {period}
          </div>

          <div className={styles.container}>
            <label htmlFor="options">Επιλογή Τμήματος:</label>
            <select
              id="options"
              name="options"
              value={selectedOption}
              onChange={handleSelectChange}
              className={styles.selectBox}
            >
              <option value="">Επιλογή Τμήματος...</option>
              <option value="option1">Τμήμα Πληροφορικής και Τηλεπικοινωνιών</option>
            </select>

          </div>

        </div>
    </div>
  );
}
  
export default NewGrades1;