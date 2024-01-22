import React from 'react';
import styles from './Popup.module.css'; 

function Popup({ message, onClose }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.customPopup}>
        <button className={styles.closeButton} onClick={handleClose}>&times;</button>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Popup;