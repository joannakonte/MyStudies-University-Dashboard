import React, { useState } from 'react';
import styles from './Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const Login = ({ onClose }) => {
  const [sdi, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const myStudiesLogo = '/mystudies-logo.png';

  async function handleLogin(e) {
    e.preventDefault();

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
          const user_role = docSnapshot.data().role;
          const user_sdi = docSnapshot.data().sdi;

          localStorage.setItem('role', user_role);
          localStorage.setItem('sdi', user_sdi);

          window.location.href = './classes';
          console.log('Found User:', docSnapshot.data());

          // Convert data to JSON string
          const userDataJSON = JSON.stringify(docSnapshot.data());

          // Store the JSON string in local storage
          localStorage.setItem('userData', userDataJSON);
        } else {
          console.log('Incorrect password!');
        }
      } else {
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
        {/* Header */}
        <div className={styles.header}>
          <h2>Σύνδεση</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Εισάγετε τον Κώδικό σας"
                style={placeholderStyle}
              />
            </label>
          </div>
          {/* Login button */}
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
