import React, { useState, useEffect } from 'react';
import Sidebar from '../../../Sidebar/Sidebar';
import { db } from '../../../../firebase';
import { collectionGroup, getDocs } from 'firebase/firestore';
import Header from '../../../Header/Header';
import TableComponent2 from '../../../DataTable/DataTable2';
import appstyle from '../NewClassesAppliction/NewClassesApplication.module.css';
import style from './HistoryApplications.module.css';
import { HiMiniPlus, HiDocumentText } from 'react-icons/hi2';

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
  }, []);

  return (
    <div>
      <Header />
      <Sidebar />
      {/* <h1 className={style['page-title']}><HiDocumentText className={style['doc-icon']} />Ιστορικό Δηλώσεων</h1> */}
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
  );
}

export default HistoryApplications;
