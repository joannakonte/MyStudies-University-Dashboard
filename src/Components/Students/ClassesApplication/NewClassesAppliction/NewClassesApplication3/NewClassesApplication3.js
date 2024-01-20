import React, { useState, useEffect } from 'react';
import styles from './NewClassesApplication3.module.css'; 
import Header from '../../../Header/Header';
import Sidebar from '../../../Sidebar/Sidebar';
import { Link, useLocation } from 'react-router-dom';
import { findStudentById } from './../../../../DataTable/DataTableUtils';
import { db } from '../../../../../firebase';
import { collection, updateDoc, doc, addDoc, serverTimestamp, deleteDoc   } from 'firebase/firestore';
import TableComponent from '../../../../DataTable/DataTable';
import appstyle from '../NewClassesApplication.module.css';
import style from './NewClassesApplication3.module.css';
import { HiCheck, HiChevronLeft } from 'react-icons/hi2';
import ProcessBar from '../ProcessBar/ProcessBar'

function NewClassesApplication3() {
  const [selectedSemester] = useState(1);
  const [markedClasses, setMarkedClasses] = useState([]);
  const stages = ['Προτεινόμενα Μαθήματα', 'Επιλογή Μαθημάτων', 'Υποβολή Δήλωσης'];

  const { state } = useLocation();

  useEffect(() => {
    const storedClasses = state && state.markedClasses ? state.markedClasses : JSON.parse(localStorage.getItem('objectGreeting')) || [];
    setMarkedClasses(storedClasses);
  }, [state]);

  const handleSubmission = async (isTemporary) => {
    try {
      console.log('Marked Classes to Submit:', markedClasses);
  
      const selectedClasses = Object.keys(markedClasses).filter(className => markedClasses[className]);
  
      if (selectedClasses.length > 8) {
        window.alert('Μπορείτε να δηλώσετε έως 8 μαθήματα.');
        return;
      }
      const storedApplicationForDelete = localStorage.getItem('applicationfordelete');
      
      if (storedApplicationForDelete) {
        const applicationDocRefToDelete = doc(db, 'applications', storedApplicationForDelete);
        await deleteDoc(applicationDocRefToDelete);

        localStorage.removeItem('applicationfordelete');
      }

      const studentId = await findStudentById();
  
      const applicationsCollection = collection(db, 'applications');

      const currentMonthIndex = new Date().getMonth();
      const season = (currentMonthIndex >= 9 || currentMonthIndex < 2) ? 'χειμερινό' : 'εαρινό';
  
      const applicationData = {
        studentId,
        submit: !isTemporary,
        date: serverTimestamp(),
        allclasses: selectedClasses.map(className => ({
          class_id: className,
          grade: '-',
          exam: season
        })),
      };
  
      const applicationRef = await addDoc(applicationsCollection, applicationData);
  
      const studentDocRef = doc(db, 'students', studentId);
      await updateDoc(studentDocRef, { submit: !isTemporary, applicationId: applicationRef.id });
  
      console.log('Application ' + (isTemporary ? 'temporarily ' : '') + 'saved successfully!');
  
      if (isTemporary) {
        window.location.href = '/home/history-applications';
      } else {
        window.alert('Η δήλωση σας οριστικοποιήθηκε επιτυχώς!');
        window.location.href = '/home/history-applications';
      }
    } catch (error) {
      console.error('Error saving application:', error);
    }
  };
  
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
          <ProcessBar stages={stages} currentStage={2} />
          
          <div className={styles.TableComponent3}>
            <TableComponent
              showOptionColumn={true}
              selectedSemester={selectedSemester}
              pageStyle={appstyle}
              submission={true}
              markedClasses={markedClasses}
              collectionName={'classes'}
              showmarkedclasses={true}
            />
          </div>

          <div className={style['button-container']}>
            <div className={style['previous']}>
              <Link to="/home/history-applications/new-application1/new-application2" className={style['previous-page']}>
                <HiChevronLeft /> Προηγούμενο
              </Link>
            </div>

            <div className={style['buttons2']}>
              <button href="/home/history-applications" className={style['save']} onClick={() => handleSubmission(true)}>
                Προσωρινή Αποθήκευση
              </button>

              <button className={style['submit']} onClick={() => handleSubmission(false)}>
                <HiCheck /> Οριστική υποβολή
              </button>
            </div>
          </div>

          
        </div>
    </div>
  );
  
}

export default NewClassesApplication3;
