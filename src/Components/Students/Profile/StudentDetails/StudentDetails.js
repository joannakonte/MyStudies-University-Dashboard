import React, { useState } from 'react';
import styles from './StudentDetails.module.css'; 
import Sidebar from '../../../Sidebar/Sidebar';
import Header from '../../../Header/Header'

function StudentDetails(){
    const [setSelectedSemester] = useState(1); 

    return (
        <div>
            <Header />
            <Sidebar setSelectedSemester={setSelectedSemester} />

            <div className={styles.main}>
                <div className={styles.grid_container}>
                    {/* Column 1 */}
                    <div className={styles.item1}>
                        column1
                    </div> 

                    {/* Column 2 */}
                    <div className={styles.item2}>
                        column2
                    </div>  
                </div>


            </div>
        </div>
    );
}

export default StudentDetails;
