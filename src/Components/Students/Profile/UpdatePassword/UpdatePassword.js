import React, { useState } from 'react';
import styles from './UpdatePassword.module.css'; 
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';

function UpdatePassword() {

  const location = useLocation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Header />
      </div>

      <div className={styles.sidebar}>
        <Sidebar currentPath={location.pathname} />
      </div>

      <div className={styles.main}>
        <p>hello</p>
      </div>
    </div>
  );
}
  
export default UpdatePassword;