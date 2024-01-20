import React from 'react';
import style from './NewClassesApplication3.module.css';

const Popup = ({ handleClosePopup, message }) => (
  <div className={style.popupOverlay}>
    <div className={style.customPopup}>
      <button className={style.closeButton} onClick={handleClosePopup}>&times;</button>
      <div className={style.popupHeader}></div>
      <h3>{message}</h3>
    </div>
  </div>
);

export default Popup;
