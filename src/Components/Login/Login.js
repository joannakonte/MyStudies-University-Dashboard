import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';

function Login() {
  const [error, setError] = useState('');
  const [sdi, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();


  const myStudiesLogo = '/mystudies-logo.png';

  async function handleLogin(e) {
    e.preventDefault();
    setError('');

    try {
      console.log('Attempting login with sdi:', sdi);

      if (!db) {
        console.error('Firestore database instance is not available.');
        return;
      }

      const q = query(collection(db, 'students'), where('sdi', '==', sdi));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0];

        if (docSnapshot.data().password === password) {
          const user_type = docSnapshot.data().type;
          const user_sdi = docSnapshot.data().sdi;

          localStorage.setItem('type', user_type);
          localStorage.setItem('sdi', user_sdi);

          // Convert data to JSON string and store it
          const userDataJSON = JSON.stringify(docSnapshot.data());
          localStorage.setItem('userData', userDataJSON);

          // Redirect based on user type
          if (user_type === 'professor') {
            navigate('/home/professor-profile'); 
          } else {
            navigate('/home/classes'); // Student route
          }

          console.log('Found User:', docSnapshot.data());
        } else {
          setError('Λάθος κωδικός πρόσβασης ή Όνομα Χρήστη!');
          console.log('Incorrect password!');
        }
      } else {
        setError('Δεν βρέθηκε χρήστης με αυτό το Όνομα Χρήστη.');
        console.log('No such document with the given sdi:', sdi);
      }
    } catch (error) {
      console.error('Login error:', error.message);
    }
}

  const placeholderStyle = {
    fontStyle: 'italic',
    color: '#888',
    fontFamily: 'Manrope',
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* <Navbar /> */}

        {/* Header */}
        <div className={styles.header}>
          <h2>Σύνδεση</h2>

          <Link to='/home' className={styles['dropdown-option']}>
            <button className={styles.closeButton}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </Link>
        </div>

        {/* Logo */}
        <img src={myStudiesLogo} alt="MyStudies Logo" className={styles['my-studies-logo']} />

        {/* Form */}
        <form>
          {/* Username */}
          <div className={styles.formGroup}>
            <label>
              Όνομα Χρήστη
              <input
                type="text"
                value={sdi}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Εισάγετε το Όνομα Χρήστη σας"
                style={placeholderStyle}
              />
            </label>
          </div>
          {/* Password */}
          <div className={styles.formGroup}>
            <label>
              Κώδικός
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Εισάγετε τον Κώδικό σας"
                style={placeholderStyle}
              />
            </label>
            <div className={styles.eyeIcon} onClick={togglePasswordVisibility}>
                {showPassword ? <HiEye /> : <HiEyeOff />}
            </div>
          </div>
          {error && <div className={styles.errorMessage}>{error}</div>} {/* Display error message */}
          {/* Login button */}
          <div className={styles.login}>
            Δεν έχεις λογαριασμό; 
            <Link to="/home/register" className={styles.login_link}> Δημιούργησε έναν τώρα.</Link>
          </div>

          <div className={styles.formGroup}>
            <button type="button" onClick={handleLogin} className={styles.loginButton}>
              Σύνδεση <FontAwesomeIcon icon={faSignInAlt} className={styles['fa-sign-in-alt']} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
