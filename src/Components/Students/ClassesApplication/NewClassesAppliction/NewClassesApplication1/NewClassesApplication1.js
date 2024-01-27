import React, { useState, useEffect } from 'react';
import styles from './NewClassesApplication1.module.css'; 
import Header from '../../../Header/Header';
import Sidebar from '../../../Sidebar/Sidebar';
import TableComponent2 from '../../../../DataTable/DataTable2';
import appstyle from '../NewClassesApplication.module.css';
import { HiChevronRight } from "react-icons/hi2";
import ProcessBar from '../ProcessBar/ProcessBar';
import { Link, useLocation } from 'react-router-dom';
import { db } from '../../../../../firebase';
import { collectionGroup, getDocs, orderBy, query, limit, where } from 'firebase/firestore';

function NewClassesApplication1() {
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [mostRecentApplicationId, setMostRecentApplicationId] = useState([]);
  const stages = ['Προτεινόμενα Μαθήματα', 'Επιλογή Μαθημάτων', 'Υποβολή Δήλωσης'];

  const location = useLocation();

  useEffect(() => {
    const fetchMostRecentApplication = async () => {
      try {
        const currentMonthIndex = new Date().getMonth();
        const exam = (currentMonthIndex >= 9 || currentMonthIndex < 2) ? 'χειμερινό' : 'εαρινό';

        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);


        const applicationsCollection = collectionGroup(db, 'applications');
        const q = query(
          applicationsCollection,
          where('submit', '==', true),
          where('exam', '==', exam),
          where('date', '<=', sixMonthsAgo),
          orderBy('date', 'desc'),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const mostRecentApplication = querySnapshot.docs[0].data();
          setMostRecentApplicationId(querySnapshot.docs[0].id);

          console.log('Most Recent Application:', mostRecentApplication);
        } else {
          console.log('No applications found');
        }
      } catch (error) {
        console.error('Error fetching most recent application:', error);
      }
    };
  
    fetchMostRecentApplication();
  }, []);
  

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Header />
      </div>

      <div className={styles.sidebar}>
        <Sidebar currentPath={location.pathname} />
      </div>

      <div className={styles.main}>
        <ProcessBar stages={stages} currentStage={0} />

        {mostRecentApplicationId.length === 0 ? (
          <div>Δεν υπάρχουν προτεινόμενα μαθήματα. Μπορείς να προχωρήσεις στο επόμενο βήμα.</div>
        ) : (
          <div className={styles.TableComponent2Grid}>
            <TableComponent2 
              showOptionColumn={true}
              selectedSemester={selectedSemester}
              pageStyle={appstyle} 
              grade={false} 
              applicationId={mostRecentApplicationId} 
              appStep1={true} 
              showmarkedclasses={true} 
            />
          </div>
        )}

        <div className={styles['next']}>
          <Link to="/home/history-applications/new-application1/new-application2" className={styles['next-page']}>
            Επόμενο <HiChevronRight  /> 
          </Link>
        </div>
        
      </div>
    </div>
  );
}

export default NewClassesApplication1;