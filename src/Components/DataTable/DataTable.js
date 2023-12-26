import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './DataTable.css';
import { HiOutlineEye, HiArrowsUpDown, HiMagnifyingGlass } from 'react-icons/hi2';
import PopUp from './PopUp';

const TableComponent = ({ showOptionColumn }) => {
  const [info, setInfo] = useState([]);
  const [checkboxes, setCheckboxes] = useState({});
  const [selectedClass, setSelectedClass] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const classesCollection = collection(db, 'classes');
      const querySnapshot = await getDocs(classesCollection);
      const classesData = querySnapshot.docs.map((doc) => doc.data());
      setInfo(classesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCheckboxChange = (id, isChecked) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [id]: isChecked,
    }));
  };

  const openPopup = (classes) => {
    setSelectedClass(classes);
  };

  const closePopup = () => {
    setSelectedClass(null);
  };

  const toggleSortOrder = (column) => {
    setSortColumn(column);
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const getSortedData = () => {
    if (sortColumn) {
      return [...info].sort((a, b) => {
        const columnA = a[sortColumn];
        const columnB = b[sortColumn];

        if (typeof columnA === 'string') {
          return sortOrder === 'asc' ? columnA.localeCompare(columnB) : columnB.localeCompare(columnA);
        } else {
          return sortOrder === 'asc' ? columnA - columnB : columnB - columnA;
        }
      });
    } else {
      return info;
    }
  };

  const filterAndSortData = () => {
    return getSortedData().filter((classes) => {
      const { name, ECTS, semester, category } = classes;
      const normalizedQuery = searchQuery.toLowerCase();
      return (
        name.toLowerCase().includes(normalizedQuery) ||
        ECTS.toString().includes(normalizedQuery) ||
        semester.toString().includes(normalizedQuery) ||
        category.toLowerCase().includes(normalizedQuery)
      );
    });
  };

  return (
    <div className="table-container">
    <div className="search-bar">
      <div className="search-icon-container">
        <HiMagnifyingGlass className="search-icon" />
      </div>
      <input
        type="text"
        className="search-input"
        placeholder="Αναζήτησε Μάθημα, Εξάμηνο, Κατηγορία ή ECTS"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
      <table className="table">
        <thead>
          <tr className="table-header">
            {showOptionColumn && <th className="table-cell">Επιλογή</th>}
            <th className="table-cell class" onClick={() => toggleSortOrder('name')}>
              Μαθήμα <HiArrowsUpDown className="icon" />
            </th>
            <th className="table-cell icon" onClick={() => toggleSortOrder('ECTS')}>
              ECTS <HiArrowsUpDown className="icon" />
            </th>
            <th className="table-cell icon" onClick={() => toggleSortOrder('category')}>
              Κατηγορία <HiArrowsUpDown className="icon" />
            </th>
            <th className="table-cell icon" onClick={() => toggleSortOrder('id')}>
              Κωδικός <HiArrowsUpDown className="icon" />
            </th>
            <th className="table-cell icon" onClick={() => toggleSortOrder('semester')}>
              Εξάμηνο <HiArrowsUpDown className="icon" />
            </th>
            <th className="table-cell">Λεπτομέρειες</th>
          </tr>
        </thead>
        <tbody>
          {filterAndSortData().map((classes, index) => (
            <tr key={index} className="table-row">
              {showOptionColumn && (
                <td className="checkbox">
                  <input
                    type="checkbox"
                    checked={checkboxes[classes.id] || false}
                    onChange={(e) => handleCheckboxChange(classes.id, e.target.checked)}
                  />
                </td>
              )}
              <td className="table-cell class">{classes.name}</td>
              <td className="table-cell">{classes.ECTS}</td>
              <td className="table-cell">{classes.category}</td>
              <td className="table-cell">{classes.id}</td>
              <td className="table-cell">{classes.semester}</td>
              <td className="eye" onClick={() => openPopup(classes)}>
                <HiOutlineEye />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PopUp isOpen={!!selectedClass} onClose={closePopup} selectedClass={selectedClass} />
    </div>
  );
};

export default TableComponent;
