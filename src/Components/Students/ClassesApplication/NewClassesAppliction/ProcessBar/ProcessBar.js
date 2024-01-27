// ProcessBar.js
import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProcessBar.module.css';
import { HiChevronRight } from "react-icons/hi2";

const ProcessBar = ({ stages, currentStage }) => {
  return (
    <div className={styles['process-bar']}>
      <div className={styles['process-stages-container']}>
        {stages.map((stage, index) => (
          <React.Fragment key={index}>
            <a
              className={`${styles['process-stage']} 
                ${index < currentStage ? styles['previous'] : ''}
                ${index === currentStage ? styles['active'] : ''}
                ${index > currentStage ? styles['next'] : ''}`}
            >
              <span className={styles['stage-number']}>{index + 1}</span>
              {stage}
            </a>
            {index < stages.length - 1 && <HiChevronRight className={styles['chevron-icon']} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

ProcessBar.propTypes = {
  stages: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentStage: PropTypes.number.isRequired,
};

export default ProcessBar;
