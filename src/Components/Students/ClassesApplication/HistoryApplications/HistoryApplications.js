import React, { useState, useEffect } from 'react';
import style from './HistoryApplications.module.css';
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import { db } from '../../../../firebase';
import { collectionGroup, getDocs } from 'firebase/firestore';
import TableComponent2 from '../../../DataTable/DataTable2';
import appstyle from '../NewClassesAppliction/NewClassesApplication.module.css';
import { HiMiniPlus } from 'react-icons/hi2';

function HistoryApplications() {
  const [applications, setApplications] = useState([]);

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
    // Remove 'objectGreeting' from local storage
    localStorage.removeItem('objectGreeting');
  }, []);

  const location = useLocation();

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <Header />
      </div>

      <div className={style.sidebar}>
        <Sidebar currentPath={location.pathname} />
      </div>

      <div className={style.main}>
        {applications.map(application => (
          <TableComponent2
            key={application.id}
            showOptionColumn={false}
            pageStyle={appstyle}
            showAllData={true}
            collectionName={'applcations'}
            grade={false}
            applicationId={application.id}
          />
        ))}
        <a href="/home/history-applications/new-application1" className={style['new-app']}>
          <HiMiniPlus /> Nέα Δήλωση
        </a>
      </div>
    </div>
  );
}

export default HistoryApplications;
