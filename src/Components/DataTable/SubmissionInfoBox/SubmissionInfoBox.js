import React from 'react';
import styles from './SubmissionInfoBox.module.css';

const SubmissionInfoBox = ({ submissionInfo }) => {
  return (
    <div className={styles['submission-info-box']}>
      <p className={submissionInfo.submit ? styles.true : styles.false}>
        Οριστικοποιήθηκε: {submissionInfo.submit ? 'ΝΑΙ' : 'ΟΧΙ'}
      </p>
      {submissionInfo.date && (
        <p>Ημερομηνία: {submissionInfo.date.toLocaleDateString()}</p>
      )}
    </div>
  );
};

export default SubmissionInfoBox;
