import React, { useState } from 'react';
import TableComponent from '../../DataTable/DataTable';
import Sidebar from '../../Sidebar/Sidebar';
import Header from '../../Header/Header';
import SemesterTable from './SemesterTable';

function Classes() {
  const [selectedSemester, setSelectedSemester] = useState(1); 

  return (
    <div>
      <Header />
      <Sidebar setSelectedSemester={setSelectedSemester} />
      <SemesterTable onSelectSemester={setSelectedSemester} />
      <TableComponent showOptionColumn={false} selectedSemester={selectedSemester} />
    </div>
  );
}

export default Classes;
