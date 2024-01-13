import React from 'react';
import Popup from 'reactjs-popup';
import './PopUp.css'; 

const PopUp = ({ isOpen, onClose, selectedClass }) => {
    return (
        <Popup open={isOpen} onClose={onClose} closeOnDocumentClick>
            <div className="pop">
                <div className="header">
                    <nav className="navbar">
                        <ul>
                            <li><a href="#">Λεπτομέρειες Μαθήματος </a></li>
                            <li><a href="#">Διδάσκων Καθηγητής </a></li>
                            <li><a href="#">Συγγραματα</a></li>
                        </ul>
                    </nav></div>
                <div className="content">
                    {selectedClass && (
                        <>
                            <h2>{selectedClass.name}</h2>
                            <p>ECTS: {selectedClass.ECTS}</p>
                            <p>Category: {selectedClass.category}</p>
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
