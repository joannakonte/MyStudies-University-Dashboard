import React, { useState } from 'react';
import styles from './UpdatePassword.module.css'; 
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../../../firebase';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';

function UpdatePassword() {
  const navigate = useNavigate();

  const location = useLocation();

  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");    
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordVerification, setShowPasswordVerification] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVerificationVisibility = () => {
    setShowPasswordVerification(!showPasswordVerification);
  };

  const isFormValid = () => { 
    if(password.length < 8){
        return "Ο κωδικός πρόσβασης πρέπει να έχει τουλάχιστον 8 χαρακτήρες.";
    }
    else if(password !== passwordVerification){
        return "Οι κωδικοί πρόσβασης δεν ταιριάζουν.";
    }
    return ""; // No error
  };


  async function handleUpdate(e) {
    e.preventDefault();
  
    try {
      const sdi = localStorage.getItem('sdi');
      if (!sdi) {
        console.error('SDI not found in local storage.');
        return;
      }
  
      console.log('Retrieved SDI:', sdi);
  
      // Create a query to find the document with the matching "sdi"
      const colRef = collection(db, 'students');
      const q = query(colRef, where('sdi', '==', sdi));
  
      // Execute the query
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        // There should be only one document in the result
        const userDocRef = querySnapshot.docs[0].ref;
        console.log('Document path:', userDocRef.path);
  
        // Proceed with the update
        const newPassword = 'newPassword'; // Replace with the actual new password
        await updateDoc(userDocRef, { password: password });
  
        console.log('Password update successful.');
      } else {
        console.error(`Document with sdi ${sdi} does not exist.`);
      }
    } catch (error) {
      console.error('Password update error:', error.message);
    }
  }


  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Header />
      </div>

      <div className={styles.sidebar}>
        <Sidebar currentPath={location.pathname} />
      </div>

      <div className={styles.main}>
        <form>
          <div className={styles.formContainer}>

            <div className={styles.passwordContainer}>
              <h2 className={styles.title}>Αλλαγή Κωδικού Πρόσβασης</h2>
              <hr className={styles.titleSeparator} />

              <div className={styles.Pass}>
                <label>
                    <div className={styles.labelText}>
                    Κωδικός <sup>*</sup>
                    </div>
                </label>
                <input
                    className={styles.inputField}
                    value={password}
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    placeholder="Κωδικός"
                />
                <div className={styles.eyeIcon} onClick={togglePasswordVisibility}>
                    {showPassword ? <HiEye /> : <HiEyeOff />}
                </div>
              </div>

              <div className={styles.ConfPass}>
                <label> 
                    <div className={styles.labelText}>
                        Επαλήθευση Κωδικού <sup>*</sup> 
                    </div>
                </label> 
                <input 
                    className={styles.inputField}
                    value={passwordVerification} 
                    type={showPasswordVerification ? 'text' : 'password'}
                    onChange={(e) => {
                        setPasswordVerification(e.target.value);
                    }}
                    placeholder="Επαλήθευση Κωδικού" 
                /> 
                <div className={styles.eyeIcon} onClick={togglePasswordVerificationVisibility}>
                    {showPasswordVerification ? <HiEye /> : <HiEyeOff />}
                </div>
              </div>

            </div>
          </div>

          

          <div className={styles.buttonContainer}>
            <Link to="/home/profile" className={styles.cancelButton}>
                Ακύρωση
            </Link>
            
            <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  const validationResult = isFormValid();
                  if (validationResult) {
                    alert(validationResult);
                  } 
                  else {
                    handleUpdate(e);
                  }
                }}
                className={styles.registerButton}
            >
                Αλλαγή Κωδικού
            </button>
          </div>
                    
        </form>
      </div>
    </div>
  );
}
  
export default UpdatePassword;