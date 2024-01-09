import React, { useState } from 'react';
import Breadcrumb from '../../Breadcrumb/Breadcrumb';
import TableComponent3 from '../../DataTable/DataTable3';
import Sidebar from '../../Sidebar/Sidebar';
import Header from '../../Header/Header';


function Certificates(){

    return(
        <div>
        <Header/>
        <Breadcrumb />
        <Sidebar />
        <TableComponent3 collectionName={'certificates'}/>
        </div>
    );
}

export default Certificates;