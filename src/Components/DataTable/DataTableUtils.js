const filterAndSortData = (info, submission, selectedSemester, checkboxes, sortColumn, sortOrder, searchQuery) => {
    const filteredData = info.filter((classes) => {
      const { name, ECTS, semester, category } = classes;
      const normalizedQuery = searchQuery.toLowerCase();
  
      if (submission) {
        // If submission is true, include all classes without checking semester
        return (
          name.toLowerCase().includes(normalizedQuery) ||
          ECTS.toString().includes(normalizedQuery) ||
          category.toLowerCase().includes(normalizedQuery)
        );
      } else {
        // If submission is false, filter based on the selected semester
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
  
  export default filterAndSortData;
  