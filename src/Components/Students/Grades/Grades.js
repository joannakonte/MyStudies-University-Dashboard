import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../Breadcrumb/Breadcrumb';
import { db } from '../../../firebase';
import { collectionGroup, getDocs } from 'firebase/firestore';
import TableComponent2 from '../../DataTable/DataTable2';
import Sidebar from '../../Sidebar/Sidebar';
import defaultstyle from '../../DataTable/DefaultTable.module.css';
import Header from '../../Header/Header';

function Grades(){
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

    return(
        <div>
        <Header/>
        {/* <Breadcrumb /> */}
        <Sidebar />
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
    );
}

export default Grades;