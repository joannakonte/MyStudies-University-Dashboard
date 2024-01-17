import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import styles from './DataTable.module.css';
import { HiArrowDownTray, HiArrowsUpDown } from 'react-icons/hi2';
import { filterAndSortDataNew, findStudentById, formatDate } from './DataTableUtils';
import items from "../../data/dataTableHeaderCert.json";

import { useRef } from 'react';
import html2pdf from 'html2pdf.js'; 
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import fileDownload from 'js-file-download';

const handleDownload = (certificationType) => {
  console.log('handleDownload called with type:', certificationType);

  const pdfElement = document.getElementById('pdf-content');
  const pdfOptions = { filename: 'document.pdf' };

  if (pdfElement) {
    html2canvas(pdfElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      
      // Add the certification type to the PDF
      pdf.text(`Certification Type: ${certificationType}`, 10, 10);

      // Add the image data
      pdf.addImage(imgData, 'PNG', 10, 30);

      // Save the PDF
      pdf.save(pdfOptions.filename);
    });
  }
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
      // Retrieve studentId from the imported function
      const studentId = await findStudentById();
      
      // Use studentId to filter the certificates
      const certificatesCollection = collection(db, collectionName);
      // const querySnapshot = await getDocs(certificatesCollection);
      // const certificatesData = querySnapshot.docs
      //   .map((doc) => doc.data())
      //   .filter((certificate) => certificate.studentId === studentId);
      const q = query(certificatesCollection, orderBy('reqdate', 'desc'), where('studentId', '==', studentId));
      const querySnapshot = await getDocs(q);
      const certificatesData = querySnapshot.docs.map((doc) => doc.data());
        
      setInfo(certificatesData);
      console.log('Data:', certificatesData);
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
                      // <HiArrowDownTray onClick={handleDownload}/> 
                      <div id="pdf-content">
                        <button
                          className={`${styles['download-button']} ${rowData.status === 'Εγκρίθηκε' ? styles.active : ''}`}
                          onClick={() => { console.log('Button clicked'); handleDownload(rowData['Είδος Πιστοποιητικού']); }}
                          disabled={rowData.status !== 'Εγκρίθηκε'}
                        >
                          <HiArrowDownTray />
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
    </div>
  );
};

export default TableComponent3;
