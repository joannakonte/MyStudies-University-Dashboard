import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
// import styles from './Login.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';
// import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const auth = getAuth(); 

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user.uid);
      setError(null);
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Login</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;

// const Login = ({ onClose }) => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  // const myStudiesLogo = '/mystudies-logo.png';

  // const handleLogin = () => {
  //   // Handle login logic here
  //   // You can add authentication logic or call an authentication API
  //   console.log('Logging in with:', username, password);
  //   // Close the login pop-up after successful login
  //   onClose();
  // };

  // const placeholderStyle = {
  //   fontStyle: 'italic',
  //   color: '#888',
  //   fontFamily: 'Manrope', 
  // };

  // return (
  //   <div className={styles.overlay}>
  //     <div className={styles.modal}>
  //       {/* Header */}
  //       <div className={styles.header}>
  //         <h2>Σύνδεση</h2>
  //         <button onClick={onClose} className={styles.closeButton}>
  //           <FontAwesomeIcon icon={faTimes} />
  //         </button>
  //       </div>

  //       {/* Logo */}
  //       <img src={myStudiesLogo} alt="MyStudies Logo" className={styles['my-studies-logo']} />

  //       {/* Form */}
  //       <form>
  //         {/* Username */}
  //         <div className={styles.formGroup}>
  //           <label>
  //             Όνομα Χρήστη
  //             <input
  //               type="text"
  //               value={username}
  //               onChange={(e) => setUsername(e.target.value)}
  //               placeholder="Εισάγετε το Όνομα Χρήστη σας"
  //               style={placeholderStyle}
  //             />
  //           </label>
  //         </div>
  //         {/* Password */}
  //         <div className={styles.formGroup}>
  //           <label>
  //             Κώδικός
  //             <input
  //               type="password"
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //               placeholder="Εισάγετε τον Κώδικό σας"
  //               style={placeholderStyle}
  //             />
  //           </label>
  //         </div>
  //         {/* Login button */}
  //         <div className={styles.formGroup}>
  //           <button type="button" onClick={handleLogin} className={styles.loginButton}>
  //             Σύνδεση <FontAwesomeIcon icon={faSignInAlt} className={styles['fa-sign-in-alt']}/> 
  //           </button>
  //         </div>
  //       </form>


  //     </div>
  //   </div>
  // );
// };

// export default Login;