import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import styles from './DataTable.module.css';
import { HiArrowDownTray, HiArrowsUpDown } from 'react-icons/hi2';
import { filterAndSortDataNew, findStudentById, formatDate } from './DataTableUtils';
import items from "../../data/dataTableHeaderCert.json";
import CertificatePDF from '../../images/Certificate.pdf';

const handleDownload = () => {
  const link = document.createElement('a');
  link.href = CertificatePDF;
  link.target = '_blank';
  link.download = 'Certificate.pdf';
  link.click();
};

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
      const studentId = await findStudentById();
      const certificatesCollection = collection(db, collectionName);
      const q = query(certificatesCollection, orderBy('reqdate', 'desc'), where('studentId', '==', studentId));
      const querySnapshot = await getDocs(q);
      const certificatesData = querySnapshot.docs.map((doc) => doc.data());
      setInfo(certificatesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const formatDateCell = (fieldName, fieldValue) => {
    if (fieldName === 'reqdate') {
      return formatDate(fieldValue);
    } else {
      return String(fieldValue);
    }
  };
  
  const toggleSortOrder = (column) => {
    setSortColumn(column);
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };
  
  return (
    <div className={`${styles['table-container']} ${styles['certif']}`}>
      {filteredAndSortedData.length === 0 ? (
        <p className={styles.noCertificates}>Δεν έχει γίνει κάποια αίτηση για πιστοποιητικό μέχρι στιγμής.</p>
      ) : (
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
                        <div id="pdf-content">
                          <button
                            className={`${styles['download-button']} ${rowData.status === 'Εγκρίθηκε' ? styles.active : ''}`}
                            onClick={() => { console.log('Button clicked'); handleDownload(); }}
                            disabled={rowData.status !== 'Εγκρίθηκε'}
                          >
                            <HiArrowDownTray size={20}/>
                          </button>
                        </div>
                      ) : (
                        '' 
                      )
                    ) : (
                      formatDateCell(field.collectionfield, rowData[field.collectionfield])
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableComponent3;
