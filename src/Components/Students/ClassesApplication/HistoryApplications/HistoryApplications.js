import React, { useState, useEffect } from 'react';
import style from './HistoryApplications.module.css';
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import { useLocation, Link } from 'react-router-dom';
import { db } from '../../../../firebase';
import { collectionGroup, getDocs, query, orderBy} from 'firebase/firestore';
import TableComponent2 from '../../../DataTable/DataTable2';
import appstyle from '../NewClassesAppliction/NewClassesApplication.module.css';
import { HiMiniPlus } from 'react-icons/hi2';
import { findStudentById } from './../../../DataTable/DataTableUtils';

function HistoryApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const applicationsCollection = collectionGroup(db, 'applications');
        const q = query(applicationsCollection, orderBy('date', 'desc'));
        const applicationsSnapshot = await getDocs(q);
        const studentId = await findStudentById();

        const applicationsData = applicationsSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(application => application.studentId === studentId);

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
        <div className={style.main_grid}>
          <div className={style['new-applic']}>
            <Link to="/home/history-applications/new-application1" className={style['new-app']}>
              <HiMiniPlus className={style['plus']}/> Nέα Δήλωση
            </Link>
          </div>

          {applications.length === 0 ? (
            <div className={style['no-applications']}>
              Δεν έχεις πραγματοποιήσει καμία δήλωση μέχρι στιγμής.
            </div>
          ) : (
            applications.map(application => (
              <TableComponent2
                key={application.id}
                showOptionColumn={false}
                pageStyle={appstyle}
                showAllData={true}
                collectionName={'applcations'}
                grade={false}
                showSubmissionInfo={true}
                applicationId={application.id}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default HistoryApplications;
