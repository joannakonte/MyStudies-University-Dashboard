import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        if (activeTab === 'professor') {
            fetchProfessorData();
        }
    }, [activeTab, selectedClass]);

    const fetchProfessorData = async () => {
        if (!selectedClass) return;

        const q = query(collection(db, 'students'), where('classes', 'array-contains', selectedClass.id));
        const querySnapshot = await getDocs(q);
        
        // Assuming there's only one professor per class
        const professor = querySnapshot.docs.map(doc => doc.data())[0];
        setProfessorData(professor);
    };

    return (
        <Popup open={isOpen} onClose={onClose} closeOnDocumentClick>
            <div className="pop">
                <div className="header">
                    <nav className="navbar">
                        <ul>
                            <li><a href="#" onClick={() => handleTabChange('details')}>Λεπτομέρειες Μαθήματος </a></li>
                            <li><a href="#" onClick={() => handleTabChange('professor')}>Διδάσκων Καθηγητής </a></li>
                            <li><a href="#" onClick={() => handleTabChange('books')}>Συγγραματα</a></li>
                        </ul>
                    </nav></div>
                <div className="content">
                    {selectedClass && (
                        <>
                            {activeTab === 'details' && (
                                <div>
                                <h2>{selectedClass.name}</h2>
                                <p>ECTS: {selectedClass.ECTS}</p>
                                <p>Category: {selectedClass.category}</p>
                                </div>
                            )}

                            {activeTab === 'professor' && (
                                <div className="professorInfoContainer">
                                    <h2>Διδάσκων Καθηγητής:</h2>
                                    {professorData ? (
                                        <div>
                                            <h3>{professorData.firstname} {professorData.lastname}</h3>
                                            {/* Display other professor details */}
                                        </div>
                                    ) : <p></p>}
                                </div>
                            )}
                            {activeTab === 'books' && (
                                <div>
                                    <h2>Συγγραματα</h2>
                                </div>
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
