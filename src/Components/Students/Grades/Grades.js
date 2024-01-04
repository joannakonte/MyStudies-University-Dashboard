import React, { useState } from 'react';
import Breadcrumb from '../../Breadcrumb/Breadcrumb';
import TableComponent from '../../DataTable/DataTable';
import Sidebar from '../../Sidebar/Sidebar';
import defaultstyle from '../../DataTable/DefaultTable.module.css';
import Header from '../../Header/Header';

function Grades(){
  const selectedSemester = useState(1); 

    return(
        <div>
        <Header/>
        {/* <Breadcrumb /> */}
        <Sidebar />
        <TableComponent showOptionColumn={false} selectedSemester={selectedSemester} pageStyle={defaultstyle}/>
        </div>
    );
}

export default Grades;