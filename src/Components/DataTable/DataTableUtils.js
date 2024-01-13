import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'

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

export const filterAndSortDataNew = (data, sortColumn, sortOrder, searchQuery) => {
  const filteredData = data.filter((item) => {
    try {
      const { certtype, reqdate, number, status, download } = item;
      const normalizedQuery = searchQuery.toLowerCase();

      return (
        (!certtype || certtype.toLowerCase().includes(normalizedQuery)) &&
        (!reqdate || String(reqdate).toLowerCase().includes(normalizedQuery)) &&
        (!number || number.toString().includes(normalizedQuery)) &&
        (!status || status.toLowerCase().includes(normalizedQuery)) &&
        (!download || download.toLowerCase().includes(normalizedQuery))
      );
    } catch (error) {
      console.error('Error in filterAndSortDataNew:', error);
      console.log('Problematic item:', item);
      return false;
    }
  });

  return filteredData.sort((a, b) => {
    const columnA = a[sortColumn];
    const columnB = b[sortColumn];

    if (typeof columnA === 'string' && typeof columnB === 'string') {
      return sortOrder === 'asc' ? columnA.localeCompare(columnB) : columnB.localeCompare(columnA);
    } else {
      // Add additional checks if the columns are not strings
      return sortOrder === 'asc' ? columnA - columnB : columnB - columnA;
    }
  });
};

export const findStudentById = async () => {
  try {
    const studentsCollection = collection(db, 'students');
    const sdi = localStorage.getItem('sdi');
    const q = query(studentsCollection, where('sdi', '==', sdi));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const studentId = querySnapshot.docs[0].id;
      console.log('Student found with ID:', studentId);
      return studentId;
    } else {
      console.log('No student found with this sdi:', sdi);
      return null;
    }
  } catch (error) {
    console.error('Error finding student:', error);
    return null;
  }
};