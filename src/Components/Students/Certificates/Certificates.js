import React, { useState } from 'react';
import styles from './Certificates.module.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Popup from 'reactjs-popup';
import TableComponent3 from '../../DataTable/DataTable3';
import { useLocation } from 'react-router-dom';
import { HiMiniPlus, HiDocumentText } from 'react-icons/hi2';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

function Certificates(){
    const [certificateType, setCertificateType] = useState("certificateType"); 
    const [certificateNumber, setCertificateNumber] = useState(""); 
    const location = useLocation();

    async function handleCertificateSubmit(e){
        e.preventDefault();

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

            // Redirect to login route
            window.location.href = '/home/certificates'

        } catch (error) {
            console.error('Certificate error:', error.message);
        }
    }
    return (
        <div className={styles.wrapper}>
        <div className={styles.header}>
            {/* Header */}
            <Header />
        </div>

        <div className={styles.sidebar}>
            {/* Sidebar */}
            {/* <Sidebar setSelectedSemester={setSelectedSemester} /> */}
            {/* <Sidebar items={sidebarStudents} /> */}
            <Sidebar currentPath={location.pathname} />
        </div>

        <div className={styles.main}>
            <TableComponent3 collectionName={'certificates'}/>
        </div>

        <Popup
                trigger={<button className={styles['new-app']}><HiMiniPlus /> Nέο Πιστοποιητικό</button>}
                modal
                nested
            >
                {close => (
                    <div className="modal">
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                        <div className="header"> Αίτηση για Νέο Πιστοποιητικό </div>
                        <div className="content">
                            <form onSubmit={handleCertificateSubmit}>
                                    <label>
                                        Επιλογή πιστοποιητικού:
                                        <input
                                            type="text"
                                            value={certificateType}
                                            onChange={e => setCertificateType(e.target.value)}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Αριθμός αντιτύπων:
                                        <input
                                            type="number"
                                            value={certificateNumber}
                                            onChange={e => setCertificateNumber(e.target.value)}
                                            required
                                        />
                                    </label>
                                    <button type="submit">Υποβολή αιτήματος</button>
                                </form>
                        </div>
                        <div className="actions">
                          <button
                              className="button"
                              onClick={() => {
                                  console.log('modal closed ');
                                  close();
                              }}
                          >
                            Υποβολή αιτήματος
                          </button>
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    );
}

export default Certificates;