import React from 'react';
import styles from './Navbar.module.css'; // Import the CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const ekpaLogo = '/ekpa-logo.png';
  const myStudiesLogo = '/mystudies-logo.png';

  return (
    <nav className={styles.navbar}>
      <div className={styles['logo-and-nav']}>
        <ul className={styles['logo-container']}>
          <li>
            <a href="/">
              <img src={myStudiesLogo} alt="MyStudies Logo" className={styles['my-studies-logo']} />
            </a>
          </li>
          <li>
            <a href="https://www.uoa.gr" target="_blank" rel="noopener noreferrer">
              <img src={ekpaLogo} alt="EKPA Logo" className={styles['ekpa-logo']} />
            </a>
          </li>
        </ul>

        <div className={styles['nav-links']}>
          <a href="#home" className={styles['nav-item']}>Αρχική</a>
          {/* First Dropdown */}
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>
              Υπηρεσίες <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <div className={styles['dropdown-content']}>
              <a href="#students">Φοιτητές</a>
              <a href="#instructors">Διδάσκοντες</a>
              <a href="#secretary">Γραμματεία</a>
            </div>
          </div>
          {/* Second Dropdown */}
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>
              Τμήμα <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <div className={styles['dropdown-content']}>
              <a href="#studyProgram">Πρόγραμμα Σπούδων</a>
              <a href="#contact">Επικοινωνία</a>
            </div>
          </div>
          <a href="#otherServices" className={styles['nav-item']}>Άλλες Υπηρεσίες ΕΚΠΑ</a>
          <a href="/home/login" className={styles['login-btn']}>
            Σύνδεση <FontAwesomeIcon icon={faSignInAlt} className={styles['fa-sign-in-alt']} /> 
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
