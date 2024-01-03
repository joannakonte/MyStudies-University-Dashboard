import React from 'react';
import styles from './StudentDetails.module.css'; 
import Sidebar from '../../../Sidebar/Sidebar';
import Header from '../../../Header/Header'

function StudentDetails(){
    return(
        <div className={styles.grid_container}>
            <div className={styles.item1}>
                <Header/>
            </div>
            <div className={styles.item2}>
                {/* <Sidebar /> */}
                Sidebar
            </div>
            <div className={styles.item3}>Main</div>  
        </div>
    );
}

export default StudentDetails;

// import Sidebar from '../../../Sidebar/Sidebar';
// import Breadcrumb from '../../../Breadcrumb/Breadcrumb';

// <div>
// <Sidebar />
// <Breadcrumb />
// <h1>Στοιχεία Φοιτητή</h1>
// </div>