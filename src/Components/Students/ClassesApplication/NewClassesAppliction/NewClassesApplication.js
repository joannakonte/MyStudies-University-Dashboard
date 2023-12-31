import React, { useState } from 'react';
import Breadcrumb from '../../../Breadcrumb/Breadcrumb';
import Sidebar from '../../../Sidebar/Sidebar';
import Header from '../../../Header/Header'
import SemesterTable from '../../Classes/SemesterTable';
import SemesterDropDown from './SemesterDropDown';
import TableComponent from '../../../DataTable/DataTable';

function NewClassesApplication(){
    const [selectedSemester, setSelectedSemester] = useState(1); 


    return(
        <div>
        <Header/>
        <Breadcrumb />
        <Sidebar />
        <SemesterDropDown onSelectSemester={setSelectedSemester} />
        {/* <SemesterTable onSelectSemester={setSelectedSemester} /> */}
        <TableComponent showOptionColumn={true} selectedSemester={selectedSemester} />
        {/* <h1>NewClassesApplication</h1> */}
        </div>
    );
}

export default NewClassesApplication;