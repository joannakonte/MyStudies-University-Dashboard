import React, { useEffect, useState } from 'react';
import styles from './ProfileStudent.module.css'; 
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import LoadingBar from './LoadingBar/LoadingBar';
import { useLocation } from 'react-router-dom';

function ProfileStudent() {
  
  const location = useLocation();
  
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    // Retrieve data from local storage
    const storedUserDataJSON = localStorage.getItem('userData');
    
    // Parse the JSON string to get the original object
    const storedUserData = JSON.parse(storedUserDataJSON);
    
    // Set the data to the state
    setUserData(storedUserData);
  }, []);

  const loadingPercentage = 50;

  return(
    <div className={styles.wrapper}>
        <div className={styles.header}>
          <Header />
        </div>

        <div className={styles.sidebar}>
          <Sidebar currentPath={location.pathname} />
        </div>

        <div className={styles.main}>
          {userData && (
            <div className={styles.info}>
              <div className={styles.columns}>
                <div className={styles.personal_info}>
                  <h2 className={styles.table_title}>Προσωπικά Στοιχεία</h2>

                  <table>
                    <tbody>
                      <tr>
                        <td className={styles.morebold}>Όνομα:</td>
                        <td>{userData.firstname}</td>
                      </tr>
                      <tr>
                        <td className={styles.morebold}>Επώνυμο:</td>
                        <td>{userData.lastname}</td>
                      </tr>
                      <tr>
                        <td className={styles.morebold}>Όνομα Πατέρα:</td>
                        <td>{userData.fathername}</td>
                      </tr>
                      <tr>
                        <td className={styles.morebold}>Όνομα Μητέρας:</td>
                        <td>{userData.mothername}</td>
                      </tr>
                      <tr>
                        <td className={styles.morebold}>Ημερομηνία Γέννησης:</td>
                        <td>{userData.birthday}</td>
                      </tr>
                      <tr>
                        <td className={styles.morebold}>Πόλη - Τόπος Γέννησης:</td>
                        <td>{userData.birthplace}</td>
                      </tr>
                      <tr>
                        <td className={styles.morebold}>Οικογενειακή Κατάσταση:</td>
                        <td>{userData.maritalstatus}</td>
                      </tr>
                      <tr>
                        <td className={styles.morebold}>Φύλο:</td>
                        <td>{userData.gender}</td>
                      </tr>
                      <tr>
                        <td className={styles.morebold}>Αριθμός Ταυτότητας:</td>
                        <td>{userData.AT}</td>
                      </tr>
                      <tr>
                        <td className={styles.morebold}>ΑΜΚΑ:</td>
                        <td>{userData.AMKA}</td>
                      </tr>
                      <tr>
                        <td className={styles.morebold}>Διεύθυνση (Οδός, Νούμερο, Πόλη):</td>
                        <td>{userData.address}</td>
                      </tr>
                      <tr>
                        <td className={styles.morebold}>Τήλέφωνο Επικοινωνίας:</td>
                        <td>{userData.phone}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className={styles.columns}>
                <div className={styles.uni_info}>
                  <h2 className={styles.table_title}>Στοιχεία Φοιτητή</h2>

                  <table>
                    <tbody>
                      <tr>
                        <td className={styles.morebold}>Τμήμα:</td>
                        <td>{userData.department}</td>
                      </tr>
                      <tr>
                        <td className={styles.morebold}>Ηλεκτρονικό Ταχυδρομείο:</td>
                        <td>{userData.email}</td>
                      </tr>
                      <tr>
                        <td className={styles.morebold}>Αριθμός Μητρώου:</td>
                        <td>{userData.AM}</td>
                      </tr>
                      <tr>
                        <td className={styles.morebold}>Ημερομηνία Εγγραφής:</td>
                        <td>{userData.registrationdate}</td>
                      </tr>
                      <tr>
                        <td className={styles.morebold}>ECTS:</td>
                        <td>{userData.ects}</td>
                      </tr>
                    </tbody>
                  </table>

                </div>

                <div className={styles.degree}>
                  <h2 className={styles.table_title}>Για πτυχίο...</h2>
                  <p className={styles.ects}>{userData.ects} / 240 ECTS</p>
                  <LoadingBar
                      bgcolor="var(--student-color)"
                      progress="30"
                      height={30}
                  />
                </div>
              </div>

            </div>            
          )}
        </div>

    </div>
  );
}
  
export default ProfileStudent;