import React, { useEffect, useState } from 'react';
import styles from './ProfileStudent.module.css'; 
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
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
              <div className={styles.personal_info}>
                <h2 className={styles.table_title}>Προσωπικά Στοιχεία</h2>

                <table>
                  <tbody>
                    <tr>
                      <td>Όνομα:</td>
                      <td>{userData.firstname}</td>
                    </tr>
                    <tr>
                      <td>Επώνυμο:</td>
                      <td>{userData.lastname}</td>
                    </tr>
                    <tr>
                      <td>Όνομα Πατέρα:</td>
                      <td>{userData.firstname}</td>
                    </tr>
                    <tr>
                      <td>Όνομα Μητέρας:</td>
                      <td>{userData.firstname}</td>
                    </tr>
                    <tr>
                      <td>Ημερομηνία Γέννησης:</td>
                      <td>{userData.firstname}</td>
                    </tr>
                    <tr>
                      <td>Πόλη - Τόπος Γέννησης:</td>
                      <td>{userData.firstname}</td>
                    </tr>
                    <tr>
                      <td>Οικογενειακή Κατάσταση:</td>
                      <td>{userData.firstname}</td>
                    </tr>
                    <tr>
                      <td>Φύλο:</td>
                      <td>{userData.firstname}</td>
                    </tr>
                    <tr>
                      <td>Αριθμός Ταυτότητας:</td>
                      <td>{userData.firstname}</td>
                    </tr>
                    <tr>
                      <td>ΑΜΚΑ:</td>
                      <td>{userData.firstname}</td>
                    </tr>
                    <tr>
                      <td>Διεύθυνση (Οδός, Νούμερο, Πόλη):</td>
                      <td>{userData.firstname}</td>
                    </tr>
                    <tr>
                      <td>Τήλέφωνο Επικοινωνίας:</td>
                      <td>{userData.firstname}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={styles.uni_info}>
                <p>hello</p>
              </div>
            </div>            
          )}
        {userData && (
            <div>
                <p>User Data:</p>
                <pre>{JSON.stringify(userData, null, 2)}</pre>
            </div>
          )}
        </div>

    </div>
  );
}
  
export default ProfileStudent;