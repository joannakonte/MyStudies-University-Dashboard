import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './DataTable.css';
import { HiOutlineEye } from 'react-icons/hi2';
import PopUp from './PopUp'; 

const TableComponent = ({ showOptionColumn }) => {
  const [info, setInfo] = useState([]);
  const [checkboxes, setCheckboxes] = useState({});
  const [selectedClass, setSelectedClass] = useState(null);

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

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr className="table-header">
            {showOptionColumn && <th className="table-cell">Επιλογή</th>}
            <th className="table-cell">Μαθήμα</th>
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
              {showOptionColumn && (
                <td className="checkbox">
                  <input
                    type="checkbox"
                    checked={checkboxes[classes.id] || false}
                    onChange={(e) => handleCheckboxChange(classes.id, e.target.checked)}
                  />
                </td>
              )}
              <td className="table-cell">{classes.name}</td>
              <td className="table-cell">{classes.ECTS}</td>
              <td className="table-cell">{classes.category}</td>
              <td className="table-cell">{classes.id}</td>
              <td className="table-cell">{classes.semester}</td>
              <td className="eye" onClick={() => openPopup(classes)}><HiOutlineEye /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <PopUp isOpen={!!selectedClass} onClose={closePopup} selectedClass={selectedClass} />
    </div>
  );
};

export default TableComponent;
