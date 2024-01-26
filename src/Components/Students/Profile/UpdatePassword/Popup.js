import React from 'react';
import styles from './Popup.module.css'; 

function Popup({ message, onClose }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.customPopup}>
        <div className={styles.header}></div>
        <button className={styles.closeButton} onClick={handleClose}>&times;</button>
        <h3>{message}</h3>
      </div>
    </div>
  );
}

export default Popup;