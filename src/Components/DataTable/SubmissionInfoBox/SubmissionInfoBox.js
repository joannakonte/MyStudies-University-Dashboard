import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './SubmissionInfoBox.module.css';
import { HiMiniPencil } from 'react-icons/hi2';

const SubmissionInfoBox = ({ submissionInfo, classIdsToCheck }) => {
  const formatDate = (date) => {
    
    const currentMonthIndex = date.getMonth();
    const season = (currentMonthIndex >= 9  || currentMonthIndex < 2 )? 'Χειμερινό' : 'Εαρινό';
    const year = (currentMonthIndex < 2) ? date.getFullYear() - 1 : date.getFullYear()
    
    return `${date.getDate()}/${currentMonthIndex + 1}/${date.getFullYear()}  |  ${season} ${year}`;
  };

  const handleEditClick = () => {
    console.log('classIdsToCheck:', classIdsToCheck);
    const storedObjectGreeting = JSON.parse(localStorage.getItem('objectGreeting')) || {};

    classIdsToCheck.forEach((classId) => {
      storedObjectGreeting[classId] = true;
    });

    localStorage.setItem('objectGreeting', JSON.stringify(storedObjectGreeting));
  };

  useEffect(() => {
    const storedObjectGreeting = localStorage.getItem('objectGreeting');
    console.log('Stored objectGreeting:', storedObjectGreeting);
  }, []);

  return (
    <div className={styles['submission-info-box']}>
      <p className={submissionInfo.submit ? styles.true : styles.false}>
        {submissionInfo.submit ? 'Προσωρινά αποθηκευμένο' : 'Οριστικοποιημένο'}
      </p>
      {submissionInfo.date && (
        <p>Ημερομηνία: {formatDate(submissionInfo.date)}</p>
      )}
      {!submissionInfo.submit && (
        <Link to="/home/history-applications/new-application1/new-application2" className={styles['pencil-icon-link']} onClick={handleEditClick}>
          <HiMiniPencil className={styles['pencil-icon']} /> Επεξεργασία
        </Link>
      )}
    </div>
  );
};

export default SubmissionInfoBox;
