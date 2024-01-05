import React, { useState } from 'react';
import styles from './StudentDetails.module.css';
import Sidebar from '../../../Sidebar/Sidebar';
import Header from '../../../Header/Header'

import SemesterTable from '../../Classes/SemesterTable';
import TableComponent from '../../../DataTable/DataTable';

function StudentDetails(){
    const [selectedSemester, setSelectedSemester] = useState(1); 

    return (
        <div className={styles.grid_container}>
            <div className={styles.item1}>
                <Header />
            </div>

            <div className={styles.item2}>
                <Sidebar setSelectedSemester={setSelectedSemester} />
            </div>

            <div className={styles.item3}>
                <SemesterTable onSelectSemester={setSelectedSemester} />
            </div>

            <div className={styles.item4}>
                <TableComponent showOptionColumn={false} selectedSemester={selectedSemester} pageStyle={styles}  />
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
                <p>hello</p>
            </div>

        </div>
    );
}

export default StudentDetails;
