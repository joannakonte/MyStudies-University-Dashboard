

import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../../Breadcrumb/Breadcrumb';
import Sidebar from '../../../Sidebar/Sidebar';
import Header from '../../../Header/Header';
import TableComponent from '../../../DataTable/DataTable';
import appstyle from '../NewClassesAppliction/NewClassesApplication.module.css';
import style from './HistoryApplications.module.css';
import { HiMiniPlus, HiDocumentText  } from 'react-icons/hi2';

function HistoryApplications() {
const [selectedSemester, setSelectedSemester] = useState(1);

useEffect(() => {
    const localStorageContent = localStorage.getItem('objectGreeting');
    console.log('Local Storage Content:', localStorageContent);
}, []);

return (
    <div>
    <Header />
    <Breadcrumb />
    <Sidebar />
    {/* <h1 className={style['page-title']}><HiDocumentText className={style['doc-icon']} />Ιστορικό Δηλώσεων</h1> */}
    <TableComponent showOptionColumn={false} selectedSemester={selectedSemester}
     pageStyle={appstyle} submission={false} showAllData={true} />
    <a href="/home/history-applications/new-application1" className={style['new-app']}>
    <HiMiniPlus /> Nέα Δήλωση
    </a>
    </div>
);
}

export default HistoryApplications;
      