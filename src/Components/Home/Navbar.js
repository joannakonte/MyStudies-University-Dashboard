import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // Import the CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { VscSignOut } from "react-icons/vsc";
import { useLocation, useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import { HiOutlineUserCircle } from 'react-icons/hi2';

function Navbar() {
  const ekpaLogo = '/ekpa-logo.png';
  const myStudiesLogo = '/mystudies-logo.png';

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage and redirect to the login page
    localStorage.clear();
    navigate('/');
  };

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = () => {
    setIsLoginOpen(true);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  useEffect(() => {
    // Check if local storage is empty
    const storedUserDataJSON = localStorage.getItem('userData');
    if (!storedUserDataJSON) {
      openLogin(); // If empty, open the login
    }
  }, []);

  const [user, setUser] = useState({ firstname: '', lastname: '', sdi: '', type: '' });
  const userType = localStorage.getItem('userType');

  useEffect(() => {
      // Retrieve data from local storage
      const storedUserDataJSON = localStorage.getItem('userData');

      // Parse the JSON string to get the original object
      const storedUserData = JSON.parse(storedUserDataJSON);

      // Extract firstname, lastname, and other properties if needed
      const { firstname, lastname, sdi, type } = storedUserData || {};

      // Set the user data to the state
      setUser({ firstname, lastname, sdi, type });
  }, []);


  // Check if user has the expected shape
  const isUserValid = user && user.firstname && user.lastname && user.sdi;

  // Create a variable for the first letter of firstname
  const firstLetterFirst = isUserValid ? user.firstname.charAt(0) : '';
  const firstLetterLast = isUserValid ? user.lastname.charAt(0) : '';



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


          <div>
            {localStorage.getItem('userData') ? (
              <div className={styles.dropdown_profile}>
                <div className={styles.dropdown}>
                  <button className={styles['dropdown-toggle']}>
                    <div className={styles.circle}>{firstLetterFirst}{firstLetterLast}</div>
                    <div className={styles['button-text']}>
                        <span>{user.firstname} {user.lastname}</span>
                        <span className={styles.id}>{user.sdi}</span>
                    </div>
                    <FontAwesomeIcon icon={faBars} className={styles['menu-icon']} />
                  </button>

                  <div className={styles['dropdown-content']}>
                    <a className={styles.dropdown_option} onClick={handleLogout}>
                      Αποσύνδεση
                    </a>
                    {user.type === 'student' && (
                      <Link to='/home/classes' className={styles['dropdown-option']}>
                        Dashboard
                      </Link>
                    )}

                    {user.type === 'professor' && (
                      <Link to='/home/professor-classes' className={styles['dropdown-option']}>
                        Dashboard
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.dropdown_profile2}>
                {isLoginOpen && <Login onClose={closeLogin} />}
                <div className={styles['profile2-options']}>
                  <a className={styles['dropdown2-option']} onClick={openLogin}>
                    Σύνδεση
                  </a>
                  <span className={styles['separator']}> | </span>
                  <Link to='/home/register' className={styles['dropdown2-option']}>
                    Εγγραφή
                  </Link>
                </div>
              </div>
            )}
          </div>




        </div>
      </div>
    </nav>
  );
}

export default Navbar;
