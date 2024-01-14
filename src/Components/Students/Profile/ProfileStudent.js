import React, { useEffect, useState } from 'react';
import styles from './ProfileStudent.module.css'; 
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';

function ProfileStudent() {
  
  const location = useLocation();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve data from local storage
    const storedUserDataJSON = localStorage.getItem('userData');

    // Parse the JSON string to get the original object
    const storedUserData = JSON.parse(storedUserDataJSON);

    // Set the data to the state
    setUserData(storedUserData);
  }, []);

  return(
    <div className={styles.wrapper}>
        <div className={styles.header}>
          <Header />
        </div>

        <div className={styles.sidebar}>
          <Sidebar currentPath={location.pathname} />
        </div>

        <div className={styles.main}>
          <div className={styles.info}>
            <div className={styles.personal_info}>
              <p>hello</p>
            </div>

            <div className={styles.uni_info}>
              <p>hello</p>
            </div>
          </div>
        </div>
    </div>
  );
}
  
export default ProfileStudent;