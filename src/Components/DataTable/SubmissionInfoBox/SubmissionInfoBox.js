import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './SubmissionInfoBox.module.css';
import { HiMiniPencil } from 'react-icons/hi2';

const SubmissionInfoBox = ({ submissionInfo, classIdsToCheck, showSubmissionInfo, applicationId }) => {
  const formatDate = (date) => {
    const currentMonthIndex = date.getMonth();
    const season = (currentMonthIndex >= 9 || currentMonthIndex < 2) ? 'Χειμερινό Εξάμηνο' : 'Εαρινό Εξάμηνο';
    const year = (currentMonthIndex < 2) ? date.getFullYear() - 1 : date.getFullYear();

    return !showSubmissionInfo ? `${season} ${year}` : `Ημερομηνία: ${date.getDate()}/${currentMonthIndex + 1}/${date.getFullYear()} | ${season} ${year}`;
  };

  const handleEditClick = () => {
    console.log('classIdsToCheck:', classIdsToCheck);
    const storedObjectGreeting = JSON.parse(localStorage.getItem('objectGreeting')) || {};

    classIdsToCheck.forEach((classId) => {
      storedObjectGreeting[classId] = true;
    });

    localStorage.setItem('objectGreeting', JSON.stringify(storedObjectGreeting));
    localStorage.setItem('applicationfordelete', applicationId);
    const storedapplicationfordelete = localStorage.getItem('applicationfordelete');
    console.log('Stored applicationfordelete:', storedapplicationfordelete);

  };

  useEffect(() => {
    const storedObjectGreeting = localStorage.getItem('objectGreeting');
    console.log('Stored objectGreeting:', storedObjectGreeting);
  }, []);

  return (
    <div className={styles['submission-info-box']}>
      {showSubmissionInfo && <p className={submissionInfo.submit ? styles.true : styles.false}>
        {submissionInfo.submit ? 'Οριστικοποιημένο' : 'Προσωρινά αποθηκευμένο' }
      </p>}
      {submissionInfo.date && (
        <p>{formatDate(submissionInfo.date)}</p>
      )}
      {showSubmissionInfo && !submissionInfo.submit && (
        <Link to="/home/history-applications/new-application1/new-application2" className={styles['pencil-icon-link']} onClick={handleEditClick}>
          <HiMiniPencil className={styles['pencil-icon']} /> Επεξεργασία
        </Link>
      )}
    </div>
  );
};

export default SubmissionInfoBox;
