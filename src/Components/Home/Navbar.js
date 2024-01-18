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

  const [user, setUser] = useState({ firstname: '', lastname: '', sdi: '', type: '' });

  useEffect(() => {
    const storedUserDataJSON = localStorage.getItem('userData');
    
    const storedUserData = JSON.parse(storedUserDataJSON);

    // Extract firstname, lastname, and other properties if needed
    const { firstname, lastname, sdi, type } = storedUserData || {};

    // Set the user data to the state
    setUser({ firstname, lastname, sdi, type });

    // Cleanup function to close the login popup when the component is unmounted
    return () => {
      setIsLoginOpen(false);
    };

    // Retrieve data from local storage

    // Parse the JSON string to get the original object
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

          <a href="/home#home" className={styles.link}>
            <button className={styles.menu_item}>
              Αρχική
            </button>
          </a>

          <a href="/home#services" className={styles.link}>
            <button className={styles.menu_item}>
              Υπηρεσίες
            </button>
          </a>

          <a href="/home#studyProgram" className={styles.link}>
            <button className={styles.menu_item}>
              Πρόγραμμα Σπούδων
            </button>
          </a>

          <a href="/home#contact" className={styles.link}>
            <button className={styles.menu_item}>
              Επικοινωνία
            </button>
          </a>

          <a href="/home#otherServices" className={styles.link}>
            <button className={styles.menu_item}>
              Υπηρεσίες ΕΚΠΑ
            </button>
          </a>



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
                    {user.type === 'student' && (
                      <Link to='/home/profile' className={styles['dropdown-option']}>
                        Προφίλ
                      </Link>
                    )}

                    {user.type === 'professor' && (
                      <Link to='/home/professor-profile' className={styles['dropdown-option']}>
                        Προφίλ
                      </Link>
                    )}
                    <a className={styles.dropdown_option} onClick={handleLogout}>
                      Αποσύνδεση
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.dropdown_profile2}>
                {isLoginOpen && <Login onClose={closeLogin} />}
                <div className={styles['profile2-options']}>
                  <a href="/home/login" className={styles['dropdown2-option']} >
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
