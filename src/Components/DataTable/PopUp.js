import React, { useState, useEffect, useCallback } from 'react';
import Popup from 'reactjs-popup';
import './PopUp.css'; 
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const PopUp = ({ isOpen, onClose, selectedClass }) => {
    // Keep track of the active tab
    const [activeTab, setActiveTab] = useState('details');

    // Handle tab change
    const handleTabChange = (tab) => {
         setActiveTab(tab);
     };

    const [professorData, setProfessorData] = useState(null);

    const fetchProfessorData = useCallback(async () => {
        if (!selectedClass) return;

        const q = query(collection(db, 'students'), where('classes', 'array-contains', selectedClass.id),
        where('type', '==', 'professor'));
        const querySnapshot = await getDocs(q);
        
        const professor = querySnapshot.docs.map(doc => doc.data())[0];
        setProfessorData(professor);
    }, [selectedClass]); 

    useEffect(() => {
        if (activeTab === 'professor') {
            fetchProfessorData();
        }
    }, [activeTab, selectedClass, fetchProfessorData]);

    return (
        <Popup open={isOpen} onClose={onClose} closeOnDocumentClick>
            <div className="pop">
                <div className="header">
                <nav className="navbar">
                    <button 
                        className={`tabButton ${activeTab === 'details' ? 'activeTabButton' : ''}`} 
                        onClick={() => handleTabChange('details')}
                    >
                        Λεπτομέρειες Μαθήματος
                    </button>
                    <button 
                        className={`tabButton ${activeTab === 'professor' ? 'activeTabButton' : ''}`} 
                        onClick={() => handleTabChange('professor')}
                    >
                        Διδάσκων Καθηγητής
                    </button>
                    <button 
                        className={`tabButton ${activeTab === 'books' ? 'activeTabButton' : ''}`} 
                        onClick={() => handleTabChange('books')}
                    >
                        Συγγραματα
                    </button>
                </nav>
                </div>
                <div className="content">
                    {selectedClass && (
                        <>
                            {activeTab === 'details' && (
                                <table className="table">
                                    <tbody>
                                        <tr className="table-row">
                                            <td className="table-cell">Όνομα:</td>
                                            <td className="table-cell">{selectedClass.name}</td>
                                        </tr>
                                        <tr className="table-row">
                                            <td className="table-cell">Εξάμηνο:</td>
                                            <td className="table-cell">{selectedClass.semester}ο</td>
                                        </tr>
                                        <tr className="table-row">
                                            <td className="table-cell">ECTS:</td>
                                            <td className="table-cell">{selectedClass.ECTS}</td>
                                        </tr>
                                        <tr className="table-row">
                                            <td className="table-cell">Κατηγορία:</td>
                                            <td className="table-cell">{selectedClass.category}</td>
                                        </tr>
                                        <tr className="table-row">
                                            <td className="table-cell">Κωδικός Μαθήματος:</td>
                                            <td className="table-cell">{selectedClass.id}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}

                            {activeTab === 'professor' && (
                                <div className="professorInfoContainer">
                                    <div className="headerContainer">
                                        <h2>Διδάσκων Καθηγητής:</h2>
                                        {professorData && (
                                            <h3>{professorData.firstname} {professorData.lastname}</h3>
                                        )}
                                    </div>
                                    {professorData && (
                                        <div>
                                            <table className="table">
                                                <tbody>
                                                    <tr className="table-row">
                                                        <td className="table-cell">Τμήμα:</td>
                                                        <td className="table-cell">{professorData.department}</td>
                                                    </tr>
                                                    <tr className="table-row">
                                                        <td className="table-cell">Τομέας:</td>
                                                        <td className="table-cell">{professorData.division}</td>
                                                    </tr>
                                                    <tr className="table-row">
                                                        <td className="table-cell">Βαθμίδα:</td>
                                                        <td className="table-cell">{professorData.rank}</td>
                                                    </tr>
                                                    <tr className="table-row">
                                                        <td className="table-cell">Email:</td>
                                                        <td className="table-cell">{professorData.email}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            )}
                            {activeTab === 'books' && (
                                <table className="table">
                                <thead className="table-header">
                                    <tr>
                                    <th>Τίτλος</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="tableRow">
                                        <td className="table-cell">{selectedClass.book}</td>
                                    </tr>
                                </tbody>
                                </table>
                            )}
                        </>
                    )}
                </div>
                <button className="closeButton" onClick={onClose}>
                    &times;
                </button>
            </div>
        </Popup>
    );
};

export default PopUp;
