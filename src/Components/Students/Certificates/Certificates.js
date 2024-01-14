import React, { useState } from 'react';
import styles from './Certificates.module.css';
import CertificatePopUp from './CertificatePopUp';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import TableComponent3 from '../../DataTable/DataTable3';
import { useLocation } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

function Certificates(){
    const [certificateType, setCertificateType] = useState("Αναλυτική Βαθμολογία"); 
    const [certificateNumber, setCertificateNumber] = useState(""); 
    const location = useLocation();

    async function handleCertificateSubmit(){
        const docCertificate = {
            certtype: certificateType,
            number: certificateNumber
        };

        try{
            console.log('Attempting to add certificate', certificateType);
            if (!db) {
                console.error('Firestore database instance is not available.');
                return;
            }

            const col_ref = collection(db, "certificates");
            const res_user = await addDoc(col_ref, docCertificate); 
            return true; // Indicate successful submission

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