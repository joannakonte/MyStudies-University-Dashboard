import React from 'react';
import Navbar from './Navbar';
import book from "../../images/books.png"
import professors_icon from "../../images/professors_icon.png"
import secretariat_icon from "../../images/secretariat_icon.png"
import student_icon from "../../images/student_icon.png"
import eudoxus_logo from "../../images/eudoxus_logo.png"
import OpenDelos_logo from "../../images/OpenDelos_logo.jpg"
import ekpa_logo from "../../images/ekpa_logo.jpg"
import eclass_logo from "../../images/eclass_logo.png"
import map from "../../images/map.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faPhone, faEnvelope, faClock, faLocationDot, faGlobe } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

function Home() {
  return (
    <div>
      <Navbar />
      <div className="Header">
        <div className="text-and-button" >
          <p>Επισκέψου τη γραμματεία του τμηματος σου από οπουδήποτε και οποιαδήποτε στιγμή!</p>
          <a href="/login" className="login-btn">
            Σύνδεση <FontAwesomeIcon icon={faSignInAlt} className="fa-sign-in-alt"/> 
          </a>
        </div>
          <img src={book} alt="books"/>
      </div>

      {/* Υπηρεσίες */}
      <div className="section">
          <h1>Υπηρεσίες</h1>

          <div className="container">
            <div className="box">
              <img src={student_icon} alt="Student" className="box-image" />
              <h2>Φοιτητές</h2>
              <p className="box-text">text</p>
            </div>

            <div className="box">
            <img src={professors_icon} alt="Professors" className="box-image" />
              <h2>Διδάσκοντες</h2>
              <p className="box-text">text</p>
            </div>

            <div className="box">
              <img src={secretariat_icon} alt="Secretariat" className="box-image" />
              <h2>Γραμματεία</h2>
              <p className="box-text">text</p>
            </div>
          </div>
      </div>


      {/* Επικοινωνία */}
        
      <div className="section">
        <h1>Επικοινωνία</h1>
        <div className="left-items">
          <h2> Τμήμα Πληροφορικής και Τηλεπικοινωνιών </h2>
          <h2> <FontAwesomeIcon icon={faPhone} /> +30 210 727 5173</h2>
          <h2> <FontAwesomeIcon icon={faPhone} /> +30 210 727 5192</h2>
          <h2> <FontAwesomeIcon icon={faEnvelope} /> secret@di.uoa.gr</h2>
          <h2> <FontAwesomeIcon icon={faClock} /> Καθημερινά 11:00-13:00 & Δευτέρα – Τρίτη - Τετάρτη 16:00-18:00</h2>
          <h2> <FontAwesomeIcon icon={faLocationDot} /> Ζωγράφου 161 22</h2>
          <h2> <FontAwesomeIcon icon={faGlobe} /> www.di.uoa.gr</h2>
        </div>
        <div className="map-background">
          <img src={map} alt="map" className="map" />
        </div>
      </div>


      {/* Αλλες υπηρεσίες ΕΚΠΑ */}
      <div className="section">
          <h1>Αλλες Υπηρεσίες ΕΚΠΑ</h1>

          <div className="container">
            <div className="box">
              <img src={eclass_logo} alt="Eclass" className="eclass-logo" />
              <p className="box-text">ή-Τάξη</p>
            </div>

            <div className="box">
            <img src={ekpa_logo} alt="EKPA" className="ekpa-logo" />
              <p className="box-text">ΕΚΠΑ</p>
            </div>

            <div className="box">
              <img src={OpenDelos_logo} alt="OpenDelos" className="OpenDelos-logo" />
              <p className="box-text">Δήλος</p>
            </div>

            <div className="box">
              <img src={eudoxus_logo} alt="Eudoxus" className="eudoxus-logo" />
              <p className="box-text">Εύδοξος</p>
            </div>
          </div>
      </div>


    </div>
  );
}

export default Home;
