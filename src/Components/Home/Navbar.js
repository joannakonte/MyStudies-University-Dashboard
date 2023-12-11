import React from 'react';
import './Navbar.css';

function Navbar() {
  const ekpaLogo = '/ekpa-logo.png';
  const myStudiesLogo = '/mystudies-logo.png';

  return (
    <nav className="navbar">
      <div className="main-container">
        <div className="logo-container">
          <img src={myStudiesLogo} alt="MyStudies Logo" className="my-studies-logo"/>
          <a href="https://www.uoa.gr">
            <img src={ekpaLogo} alt="EKPA Logo" className="ekpa-logo" />
          </a>
        </div>
        <div className="nav-links">
          <a href="#home">Αρχική</a>
          {/* First Dropdown */}
          <div className="dropdown">
            <button className="dropbtn">Υπηρεσίες</button>
            <div className="dropdown-content">
              <a href="#students">Φοιτητές</a>
              <a href="#instructors">Διδάσκοντες</a>
              <a href="#secretary">Γραμματεία</a>
            </div>
          </div>
          {/* Second Dropdown */}
          <div className="dropdown">
            <button className="dropbtn">Τμήματα</button>
            <div className="dropdown-content">
              <a href="#studyProgram">Πρόγραμμα Σπούδων</a>
              <a href="#contact">Επικοινωνία</a>
            </div>
          </div>
          <a href="#otherServices">Άλλες Υπηρεσίες ΕΚΠΑ</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
