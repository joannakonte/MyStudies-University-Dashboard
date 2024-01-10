import React, { useState } from 'react';
import styles from './Certificates.module.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import TableComponent3 from '../../DataTable/DataTable3';
import { useLocation } from 'react-router-dom';


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
        </div>
    );
}

export default Certificates;