import React, { useState, useEffect } from 'react';
import { db } from '../../../../../firebase';
import { collection, updateDoc, doc } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { useLocation } from 'react-router-dom'; 
import Header from '../../../../Header/Header';
import Breadcrumb from '../../../../Breadcrumb/Breadcrumb';
import Sidebar from '../../../../Sidebar/Sidebar';
import TableComponent from '../../../../DataTable/DataTable';
import appstyle from '../NewClassesApplication.module.css';
import style from './NewClassesApplication3.module.css';
import { HiCheck, HiChevronLeft } from 'react-icons/hi2';

function NewClassesApplication3() {
  const [selectedSemester] = useState(1);
  const [markedClasses, setMarkedClasses] = useState([]);
  const { state } = useLocation(); 

  // Fetch marked classes from local storage or state
  useEffect(() => {
    const storedClasses = state && state.markedClasses ? state.markedClasses : localStorage.getItem('markedClasses');
    console.log(storedClasses);
    if (storedClasses) {
      const parsedClasses = JSON.parse(storedClasses);
      setMarkedClasses(Array.isArray(parsedClasses) ? parsedClasses : []);
    }
  }, [state]);

  // Handle submission
  const handleSubmission = async () => {
    try {
      // Assuming you have a collection named 'applications'
      const applicationsCollection = collection(db, 'applications');

      // Create an application object
      const applicationData = {
        studentId: '2a5iiuGDHgvDPwBkVoAk', // Replace with the actual student ID
        submit: true,
        allclasses: markedClasses,
      };

      // Add the application to the 'applications' collection
      await addDoc(applicationsCollection, applicationData);

      // Update the 'submit' field in the student document
      const studentDocRef = doc(db, 'students', '2a5iiuGDHgvDPwBkVoAk');
      await updateDoc(studentDocRef, { submit: true });

      console.log('Application submitted successfully!');
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  return (
    <div>
      <Header />
      <Breadcrumb />
      <Sidebar />
      <a href="/home/history-applications/new-application2" className={appstyle['previous-page']}>
        <HiChevronLeft /> Προηγούμενο
      </a>
      <TableComponent
        showOptionColumn={true}
        selectedSemester={selectedSemester}
        pageStyle={appstyle}
        submission={true}
        markedClasses={markedClasses} // Pass markedClasses to TableComponent
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
