import React, { useState } from 'react';
import Breadcrumb from '../../Breadcrumb/Breadcrumb';
import TableComponent from '../../DataTable/DataTable';
import Sidebar from '../../Sidebar/Sidebar';
import Header from '../../Header/Header'

function Certificates(){
    const selectedSemester = useState(1); 

    return(
        <div>
        <Header/>
        <Breadcrumb />
        <Sidebar />
        <TableComponent showOptionColumn={false} selectedSemester={selectedSemester} />
        </div>
    );
}

export default Certificates;