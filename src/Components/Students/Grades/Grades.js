import React, { useState } from 'react';
import TableComponent from '../../DataTable/DataTable';
import Sidebar from '../../Sidebar/Sidebar';
import Header from '../../Header/Header'

function Grades(){
  const selectedSemester = useState(1); 

    return(
        <div>
        <Header/>
        <Sidebar />
        <TableComponent showOptionColumn={false} selectedSemester={selectedSemester} />
        </div>
    );
}

export default Grades;