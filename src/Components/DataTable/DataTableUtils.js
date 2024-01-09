export const filterAndSortData = (info, submission, selectedSemester, checkboxes, sortColumn, sortOrder, searchQuery) => {
    const filteredData = info.filter((classes) => {
      const { name, ECTS, semester, category } = classes;
      const normalizedQuery = searchQuery.toLowerCase();
  
      if (submission) {
        return (
          name.toLowerCase().includes(normalizedQuery) ||
          ECTS.toString().includes(normalizedQuery) ||
          category.toLowerCase().includes(normalizedQuery)
        );
      } else {
        const semesterMatch = selectedSemester.toString() === '' || semester.toString() === selectedSemester.toString();
        return (
          semesterMatch &&
          (name.toLowerCase().includes(normalizedQuery) ||
            ECTS.toString().includes(normalizedQuery) ||
            category.toLowerCase().includes(normalizedQuery))
        );
      }
    });
  
    if (submission) {
      const markedClasses = filteredData.filter((classes) => checkboxes[classes.id]);
  
      return markedClasses.sort((a, b) => {
        const columnA = a[sortColumn];
        const columnB = b[sortColumn];
  
        if (typeof columnA === 'string') {
          return sortOrder === 'asc' ? columnA.localeCompare(columnB) : columnB.localeCompare(columnA);
        } else {
          return sortOrder === 'asc' ? columnA - columnB : columnB - columnA;
        }
      });
    } else {
      return filteredData.sort((a, b) => {
        const columnA = a[sortColumn];
        const columnB = b[sortColumn];
  
        if (typeof columnA === 'string') {
          return sortOrder === 'asc' ? columnA.localeCompare(columnB) : columnB.localeCompare(columnA);
        } else {
          return sortOrder === 'asc' ? columnA - columnB : columnB - columnA;
        }
      });
    }
  };
export const filterAndSortData2 = (info, submission, checkboxes, sortColumn, sortOrder, searchQuery) => {
  const filteredData = info.filter((item) => {
    const { name = '', ECTS = '', category = '' } = item;
    const normalizedQuery = searchQuery.toLowerCase();

    if (submission) {
      return (
        name.toLowerCase().includes(normalizedQuery) ||
        ECTS.toString().includes(normalizedQuery) ||
        category.toLowerCase().includes(normalizedQuery)
      );
    } else {
      return (
        name.toLowerCase().includes(normalizedQuery) ||
        ECTS.toString().includes(normalizedQuery) ||
        category.toLowerCase().includes(normalizedQuery)
      );
    }
  });

  return filteredData.sort((a, b) => {
    const columnA = a[sortColumn] || '';
    const columnB = b[sortColumn] || '';

    if (typeof columnA === 'string') {
      return sortOrder === 'asc' ? columnA.localeCompare(columnB) : columnB.localeCompare(columnA);
    } else {
      return sortOrder === 'asc' ? columnA - columnB : columnB - columnA;
    }
  });
};
