import React, { useState } from 'react';
import styles from './Certificates.module.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import TableComponent3 from '../../DataTable/DataTable3';
import { useLocation } from 'react-router-dom';
import { HiMiniPlus, HiDocumentText } from 'react-icons/hi2';

function Certificates(){

    const location = useLocation();

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

        <a href="/home/history-applications/new-application1" className={styles['new-app']}>
          <HiMiniPlus /> Nέο Πιστοποιητικό
        </a>
        </div>
    );
}

export default Certificates;