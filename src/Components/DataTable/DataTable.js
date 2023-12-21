import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './DataTable.css'; 
import { HiOutlineEye  } from "react-icons/hi2";


const TableComponent = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const classesCollection = collection(db, 'classes');
      const querySnapshot = await getDocs(classesCollection);
      const classesData = querySnapshot.docs.map(doc => doc.data());
      setInfo(classesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr className="table-header">
            <th className="table-cell">Mαθήμα</th>
            <th className="table-cell">ECTS</th>
            <th className="table-cell">Κατηγορία</th>
            <th className="table-cell">Κωδικός</th>
            <th className="table-cell">Εξάμηνο</th>
            <th className="table-cell">Λεπτομέρειες</th>
          </tr>
        </thead>
        <tbody>
          {info.map((classes, index) => (
            <tr key={index} className="table-row">
              <td className="table-cell">{classes.name}</td>
              <td className="table-cell">{classes.ECTS}</td>
              <td className="table-cell">{classes.category}</td>
              <td className="table-cell">{classes.id}</td>
              <td className="table-cell">{classes.semester}</td>
              <td className="eye">{<HiOutlineEye  />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
