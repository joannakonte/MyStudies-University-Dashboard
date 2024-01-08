import React, { useState, useEffect } from 'react';
import { db } from '../../../../../firebase';
import { collection, updateDoc, doc, addDoc } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import Header from '../../../../Header/Header';
// import Breadcrumb from '../../../../Breadcrumb/Breadcrumb';
import Sidebar from '../../../../Sidebar/Sidebar';
import TableComponent from '../../../../DataTable/DataTable';
import appstyle from '../NewClassesApplication.module.css';
import style from './NewClassesApplication3.module.css';
import { HiCheck, HiChevronLeft, HiDocumentPlus } from 'react-icons/hi2';
import ProcessBar from '../ProcessBar/ProcessBar'

function NewClassesApplication3() {
  const [selectedSemester] = useState(1);
  const [markedClasses, setMarkedClasses] = useState([]);
  const stages = ['Επιλογή Εξαμήνου', 'Επιλογή Μαθημάτων', 'Υποβολή Δήλωσης'];

  const { state } = useLocation();

  useEffect(() => {
    const storedClasses = state && state.markedClasses ? state.markedClasses : JSON.parse(localStorage.getItem('objectGreeting')) || [];
    setMarkedClasses(storedClasses);
  }, [state]);

  const handleSubmission = async () => {
    try {
      console.log('Marked Classes to Submit:', markedClasses);
  
      const studentId = '2a5iiuGDHgvDPwBkVoAk';
  
      const applicationsCollection = collection(db, 'applications');
  
      const selectedClasses = Object.keys(markedClasses).filter(className => markedClasses[className]);
  
      const applicationData = {
        studentId,
        submit: true,
        allclasses: selectedClasses.reduce((acc, className) => {
          acc[className] = true;
          return acc;
        }, {}),
      };
  

      const applicationRef = await addDoc(applicationsCollection, applicationData);
  
      const studentDocRef = doc(db, 'students', studentId);
      await updateDoc(studentDocRef, { submit: true, applicationId: applicationRef.id });
  
      console.log('Application submitted successfully!');
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };
  

  return (
    <div>
      <Header />
      {/* <Breadcrumb /> */}
      <Sidebar />
      <ProcessBar stages={stages} currentStage={2} />
      <a href="/home/history-applications/new-application2" className={appstyle['previous-page']}>
        <HiChevronLeft /> Προηγούμενο
      </a>
      {/* <h1 className={appstyle['page-title']}><HiDocumentPlus className={appstyle['doc-icon']} />Νέα Δηλώση</h1> */}
      <TableComponent
        showOptionColumn={true}
        selectedSemester={selectedSemester}
        pageStyle={appstyle}
        submission={true}
        markedClasses={markedClasses}
        collectionName={'classes'}
      />
      <a href="/home/history-applications/submission" className={style['save']}>
        Προσωρινή Αποθήκευση
      </a>
      <button className={style['submit']} onClick={handleSubmission}>
        <HiCheck /> Οριστική υποβολή
      </button>
    </div>
  );
}

export default NewClassesApplication3;
