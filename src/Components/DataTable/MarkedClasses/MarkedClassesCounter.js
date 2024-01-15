import React from 'react';
import styles from './MarkedClassesCounter.module.css'; // Create a CSS file for styling
import { HiExclamationTriangle  } from 'react-icons/hi2';

const MarkedClassesCounter = ({ markedClassesCount }) => {
  const isLimitReached = markedClassesCount >= 8;

  return (
    <div className={`${styles.counter} ${isLimitReached ? styles.limitReached : ''}`}>
      Συνολικά επιλεγμένα μαθήματα: {markedClassesCount}  <HiExclamationTriangle  size={20} color="orange" /> Επιλέξτε έως 8 μαθήματα
    </div>
  );
};

export default MarkedClassesCounter;
