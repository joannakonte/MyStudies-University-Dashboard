import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import './PopUp.css'; 

const PopUp = ({ isOpen, onClose, selectedClass }) => {
     // Keep track of the active tab
     const [activeTab, setActiveTab] = useState('details');

     // Handle tab change
     const handleTabChange = (tab) => {
         setActiveTab(tab);
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
                                <div>
                                    <h2>Διδάσκων Καθηγητής</h2>
                                    <p>{selectedClass.professor}</p>
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
