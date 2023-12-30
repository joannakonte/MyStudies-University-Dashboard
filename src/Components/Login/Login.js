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
          <div className={styles.formGroup}>
            <label>
              Όνομα Χρήστη:
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label>
              Κώδικός:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
          </div>
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