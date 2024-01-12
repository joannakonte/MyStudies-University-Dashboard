import React, { useState, useEffect } from 'react';
import styles from './Grades.module.css'; 
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import { db } from '../../../firebase';
import { collectionGroup, getDocs } from 'firebase/firestore';
import TableComponent2 from '../../DataTable/DataTable2';
import defaultstyle from '../../DataTable/DefaultTable.module.css';

function Grades(){
  const [applications, setApplications] = useState([]);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve data from local storage
    const storedUserDataJSON = localStorage.getItem('userData');

    // Parse the JSON string to get the original object
    const storedUserData = JSON.parse(storedUserDataJSON);

    // Set the data to the state
    setUserData(storedUserData);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const applicationsCollection = collectionGroup(db, 'applications');
        const applicationsSnapshot = await getDocs(applicationsCollection);

        const applicationsData = applicationsSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(application => application.studentId === '2a5iiuGDHgvDPwBkVoAk');

        console.log('Matching Application Documents:', applicationsData);
        setApplications(applicationsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const location = useLocation();

  return(
    <div className={styles.wrapper}>
        <div className={styles.header}>
          <Header />
        </div>

        <div className={styles.sidebar}>
          <Sidebar currentPath={location.pathname} />
        </div>

        <div className={styles.main}>
          {applications.map(application => (
            <TableComponent2
              key={application.id}
              showOptionColumn={false}
              
              showAllData={true}
              collectionName={'applcations'}
              grade={true}
              applicationId={application.id}
            />
          ))}
        </div>
    </div>
  );
}

export default Grades;