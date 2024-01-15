import React, { useState } from 'react';
import styles from './Certificates.module.css';
import CertificatePopUp from './CertificatePopUp';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import TableComponent3 from '../../DataTable/DataTable3';
import { useLocation } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase';
import {findStudentById} from '../../DataTable/DataTableUtils';

function Certificates(){
    const [certificateType, setCertificateType] = useState("Αναλυτική Βαθμολογία"); 
    const [certificateNumber, setCertificateNumber] = useState(""); 
    const location = useLocation();

    async function handleCertificateSubmit() {
        const numCertificates = parseInt(certificateNumber, 10);
      
        if (isNaN(numCertificates) || numCertificates <= 0) {
          console.error('Invalid certificate number');
          return;
        }
      
        const studentId = await findStudentById();
      
        try {
          console.log('Attempting to add certificates', certificateType);
      
          if (!db) {
            console.error('Firestore database instance is not available.');
            return;
          }
      
          const col_ref = collection(db, 'certificates');

          const certificatesBatch = Array.from({ length: numCertificates }, (_) => {
            return {
              certtype: certificateType,
              number: 1, 
              reqdate: serverTimestamp(),
              status: 'Εγκρίθηκε',
              studentId: studentId,
            };
          });
      
          await Promise.all(certificatesBatch.map(async (certificate) => await addDoc(col_ref, certificate)));
      
          return true;
        } catch (error) {
          console.error('Certificate error:', error.message);
        }
      }
      
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
              <Header />
            </div>

            <div className={styles.sidebar}>
              <Sidebar currentPath={location.pathname} />
            </div>

            <div className={styles.main}>
                <TableComponent3 collectionName={'certificates'}/>
            </div>

            <CertificatePopUp
                certificateType={certificateType}
                setCertificateType={setCertificateType}
                certificateNumber={certificateNumber}
                setCertificateNumber={setCertificateNumber}
                handleCertificateSubmit={handleCertificateSubmit}
            />

        </div>
    );
}

export default Certificates;