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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faPhone, faEnvelope, faClock, faLocationDot, faGlobe } from '@fortawesome/free-solid-svg-icons';
import styles from './Home.module.css';

function Home() {
  return (
    <div>
      <Navbar />
      <div className={styles.Header}>
        <div className={styles['text-and-button']} >
          <p>Επισκέψου τη γραμματεία του τμηματος σου<br />από οπουδήποτε και οποιαδήποτε στιγμή!</p>
          <a href="/login" className={styles['login-btn']}>
            Σύνδεση <FontAwesomeIcon icon={faSignInAlt} className={styles['fa-sign-in-alt']}/> 
          </a>
        </div>
          <img src={book} alt="books"/>
      </div>

      {/* Υπηρεσίες */}
      <div className={styles.section}>
          <h1>Υπηρεσίες</h1>

          <div className={styles.container}>
            <div className={styles.box}>
              <img src={student_icon} alt="Student" className={styles['box-image']} />
              <h2>Φοιτητές</h2>
              <p className={styles['box-text']}>text</p>
            </div>

            <div className={styles.box}>
            <img src={professors_icon} alt="Professors" className={styles['box-image']} />
              <h2>Διδάσκοντες</h2>
              <p className={styles['box-text']}>text</p>
            </div>

            <div className={styles.box}>
              <img src={secretariat_icon} alt="Secretary" className={styles['box-image']} />
              <h2>Γραμματεία</h2>
              <p className={styles['box-text']}>text</p>
            </div>
          </div>
      </div>


      {/* Επικοινωνία */}
        
      <div className={styles['section_contact']} style={{ backgroundColor: '#yourBackgroundColor' }}>
        <h1>Επικοινωνία</h1>

        <div className={styles.container}>
          <div className={styles['box-contact']}>
            <h2> Τμήμα Πληροφορικής και Τηλεπικοινωνιών </h2>
            <h3>
              <FontAwesomeIcon icon={faPhone} style={{ marginRight: '10px', fontSize: '24px' }} />
              <a href="tel:+302107275173" style={{ textDecoration: 'none', color: 'inherit' }}>+30 210 727 5173</a>
            </h3>
            <h3>
              <FontAwesomeIcon icon={faPhone} style={{ marginRight: '10px', fontSize: '24px' }} />
              <a href="tel:+302107275192" style={{ textDecoration: 'none', color: 'inherit' }}>+30 210 727 5192</a>
            </h3>
            <h3>
              <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '10px', fontSize: '24px' }} />
              <a href="mailto:secret@di.uoa.gr" style={{ textDecoration: 'none', color: 'inherit' }}>secret@di.uoa.gr</a>
            </h3>
            <h3>
              <FontAwesomeIcon icon={faClock} style={{ marginRight: '10px', fontSize: '24px' }}/>
              Καθημερινά 11:00-13:00 <br/> Δευτέρα – Τρίτη - Τετάρτη 16:00-18:00
            </h3>
            <h3>
              <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '15px', fontSize: '24px' }} />
              <a
                href="https://www.google.com/maps/place/%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1+%CE%A0%CE%BB%CE%B7%CF%81%CE%BF%CF%86%CE%BF%CF%81%CE%B9%CE%BA%CE%AE%CF%82+%CE%BA%CE%B1%CE%B9+%CE%A4%CE%B7%CE%BB%CE%B5%CF%80%CE%B9%CE%BA%CE%BF%CE%B9%CE%BD%CF%89%CE%BD%CE%B9%CF%8E%CE%BD/@37.9690297,23.7615575,15.75z/data=!4m6!3m5!1s0x14a197e10ffd248b:0x9e1a1dd511c44165!8m2!3d37.9681368!4d23.7665108!16s%2Fg%2F1262c8hsn?entry=ttu"
                style={{ textDecoration: 'none', color: 'inherit' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ζωγράφου 161 22
              </a>
            </h3>
            <h3>
              <FontAwesomeIcon icon={faGlobe} style={{ marginRight: '10px', fontSize: '24px' }} />
              <a
                href="www.di.uoa.gr"
                style={{ textDecoration: 'none', color: 'inherit' }}
                target="_blank"
                rel="noopener noreferrer"
              >
              www.di.uoa.gr
              </a>
            </h3>
          </div>

          <div className={styles['map-background']}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50339.40851970168!2d23.67287967504338!3d37.94881151792357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a197e10ffd248b%3A0x9e1a1dd511c44165!2zzqTOvM6uzrzOsSDOoM67zrfPgc6_z4bOv8-BzrnOus6uz4IgzrrOsc65IM6kzrfOu861z4DOuc66zr_Ouc69z4nOvc65z47OvQ!5e0!3m2!1sel!2sgr!4v1703430376620!5m2!1sel!2sgr"
              width="476px"
              height="605px"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>


      {/* Αλλες υπηρεσίες ΕΚΠΑ */}
      <div className={styles.section}>
          <h1>Αλλες Υπηρεσίες ΕΚΠΑ</h1>

          <div className={styles.container}>
            <div className={styles.box}>
              <img src={eclass_logo} alt="Eclass" className={styles['eclass-logo']} />
              <p className={styles['box-text']}>ή-Τάξη</p>
            </div>

            <div className={styles.box}>
            <img src={ekpa_logo} alt="EKPA" className={styles['ekpa-logo']} />
              <p className={styles['box-text']}>ΕΚΠΑ</p>
            </div>

            <div className={styles.box}>
              <img src={OpenDelos_logo} alt="OpenDelos" className={styles['OpenDelos-logo']} />
              <p className={styles['box-text']}>Δήλος</p>
            </div>

            <div className={styles.box}>
              <img src={eudoxus_logo} alt="Eudoxus" className={styles['eudoxus-logo']} />
              <p className={styles['box-text']}>Εύδοξος</p>
            </div>
          </div>
      </div>


    </div>
  );
}

export default Home;
