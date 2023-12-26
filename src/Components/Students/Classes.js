import React from 'react';
import TableComponent from '../DataTable/DataTable';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header'

function Classes(){
    return(
        <div>
        <Header/>
        <Sidebar />
        <TableComponent showOptionColumn={true} />
        </div>
    );
}

export default Classes;