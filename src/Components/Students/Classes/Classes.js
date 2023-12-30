import React, { useState } from 'react';
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import SemesterTable from './SemesterTable';
import TableComponent from '../../DataTable/DataTable';
import Breadcrumb from '../../Breadcrumb/Breadcrumb';

function Classes() {
  const [selectedSemester, setSelectedSemester] = useState(1); 

  return (
    <div>
      <Header />
      <Breadcrumb />
      <Sidebar setSelectedSemester={setSelectedSemester} />
      <SemesterTable onSelectSemester={setSelectedSemester} />
      <TableComponent showOptionColumn={false} selectedSemester={selectedSemester} />
    </div>
  );
}

export default Classes;
