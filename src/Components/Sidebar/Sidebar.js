// Sidebar.js
import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Menu</h3>
      <div className="basics">
        <div className="dropdown-sidebar">
          <button className="dropbtn_profil">Προφίλ <FontAwesomeIcon icon={faChevronDown} /></button>
          <div className="dropdown-content-sidebar">
            <a href="/general-student">Στοιχεία Φοιτητή</a>
            <a href="/personal-student">Προσωπικά Στοιχεια</a>
            <a href="/history-visits">Ιστορικό Επισκέψεων</a>
          </div>
        </div>
        <button>Μαθήματα</button>
        <div className="dropdown-sidebar">
          <button className="dropbtn_profil">Δηλώσεις <FontAwesomeIcon icon={faChevronDown} /></button>
          <div className="dropdown-content-sidebar">
            <a href="/history-applications">Ιστορικό Δηλώσεων</a>
            <a href="/new-application">Νέα Δήλωση</a>
          </div>
        </div>
        <button>Πιστοποιητικά</button>
      </div>

      <div className="rest">
        <button>Αρχική</button>
        <button>Συχνές Ερωτήσεις</button>
        <button>Αποσύνδεση</button>
      </div>
    </div>
  );
};

export default Sidebar;
