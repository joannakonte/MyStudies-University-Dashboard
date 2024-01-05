import React, { useState } from 'react';
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import SemesterTable from './SemesterTable';
import TableComponent from '../../DataTable/DataTable';
import defaultstyle from '../../DataTable/DefaultTable.module.css';

function Classes() {
  const [selectedSemester, setSelectedSemester] = useState(1); 

  return (
    <div>
      <Header />
      {/* <Breadcrumb /> */}
      <Sidebar setSelectedSemester={setSelectedSemester} />
      <SemesterTable onSelectSemester={setSelectedSemester} />
      <TableComponent showOptionColumn={false} selectedSemester={selectedSemester} pageStyle={defaultstyle} />
    </div>
  );
}

export default Classes;
