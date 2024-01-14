// LoadingBar.js
import React from 'react';
import styles from './LoadingBar.module.css';

const LoadingBar = ({ bgcolor, progress, height }) => {
  const Parentdiv = {
    height: height,
    width: '100%',
    backgroundColor: 'whitesmoke',
    borderRadius: 40,
  };

  const Childdiv = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: 'right',
  };


  return (
      <div className={styles.loadingBarContainer} style={Parentdiv}>
      <div className={styles.loadingBar} style={Childdiv}>
        <span className={styles.progressText}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default LoadingBar;
