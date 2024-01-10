import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import styles from './DataTable.module.css';
import { HiArrowDownTray , HiArrowsUpDown } from 'react-icons/hi2';
import PopUp from './PopUp';
import SearchBar from './SearchBar';
import { filterAndSortDataNew } from './DataTableUtils';
import items from "../../data/dataTableHeaderCert.json"

const TableComponent3 = ({ collectionName }) => {
  const [info, setInfo] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [collectionName]);

  useEffect(() => {
    const updatedFilteredData = filterAndSortDataNew(
      info,
      sortColumn,
      sortOrder,
      searchQuery
    );
    setFilteredAndSortedData(updatedFilteredData);
  }, [info, sortColumn, sortOrder, searchQuery]);

  const fetchData = async () => {
    try {
      const certificatesCollection = collection(db, collectionName);
      const querySnapshot = await getDocs(certificatesCollection);
      const certificatesData = querySnapshot.docs.map((doc) => doc.data());
      setInfo(certificatesData);
      console.log('Data:', certificatesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleSortOrder = (column) => {
    setSortColumn(column);
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className={`${styles['table-container']} ${styles['certif']}`}>
      <table className={styles.table}>
        <thead>
          <tr className={styles['table-header']}>
            {items.map((field, index) => (
              <th key={index} className={`${styles['table-cell']} `} onClick={() => toggleSortOrder(field.collectionfield)}>
                {field.title} {<HiArrowsUpDown className={styles.icon} />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedData.map((rowData, index) => (
            <tr key={index} className={`${styles['table-row']}`}>
              {items.map((field, fieldIndex) => (
                <td key={fieldIndex} className={`${styles['table-cell']} ${styles[field.collectionfield]}`}>
                  {field.collectionfield === 'download' ? (
                    rowData.status === 'Εγκρίθηκε' ? (
                      <HiArrowDownTray  /> 
                    ) : (
                      '' 
                    )
                  ) : (
                    String(rowData[field.collectionfield])
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent3;