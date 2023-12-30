import React, { useState } from 'react';
import styles from './Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faPhone, faEnvelope, faClock, faLocationDot, faGlobe } from '@fortawesome/free-solid-svg-icons';

const Login = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const myStudiesLogo = '/mystudies-logo.png';

  const handleLogin = () => {
    // Handle login logic here
    // You can add authentication logic or call an authentication API
    console.log('Logging in with:', username, password);
    // Close the login pop-up after successful login
    onClose();
  };

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
                value={username}
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
              Σύνδεση <FontAwesomeIcon icon={faSignInAlt} className={styles['fa-sign-in-alt']}/> 
            </button>
          </div>
        </form>


      </div>
    </div>
  );
};

export default Login;