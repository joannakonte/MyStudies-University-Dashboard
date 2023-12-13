import React from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSignInAlt } from '@fortawesome/free-solid-svg-icons';


function Navbar() {
  const ekpaLogo = '/ekpa-logo.png';
  const myStudiesLogo = '/mystudies-logo.png';

  return (
    <nav className="navbar">
      <div className="logo-and-nav">
        <ul className="logo-container">
          <li>
            <a href="/">
              <img src={myStudiesLogo} alt="MyStudies Logo" className="my-studies-logo" />
            </a>
          </li>
          <li>
            <a href="https://www.uoa.gr">
              <img src={ekpaLogo} alt="EKPA Logo" className="ekpa-logo" />
            </a>
          </li>
        </ul>

        <div className="nav-links">
          <a href="#home" className="nav-item" >Αρχική</a>
          {/* First Dropdown */}
          <div className="dropdown">
            <button className="dropbtn">
              Υπηρεσίες <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <div className="dropdown-content">
              <a href="#students">Φοιτητές</a>
              <a href="#instructors">Διδάσκοντες</a>
              <a href="#secretary">Γραμματεία</a>
            </div>
          </div>
          {/* Second Dropdown */}
          <div className="dropdown">
            <button className="dropbtn">
              Τμήματα <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <div className="dropdown-content">
              <a href="#studyProgram">Πρόγραμμα Σπούδων</a>
              <a href="#contact">Επικοινωνία</a>
            </div>
          </div>
          <a href="#otherServices" className="nav-item" >Άλλες Υπηρεσίες ΕΚΠΑ</a>
          <a href="/login" className="login-btn">
            Σύνδεση <FontAwesomeIcon icon={faSignInAlt} className="fa-sign-in-alt"/> 
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
