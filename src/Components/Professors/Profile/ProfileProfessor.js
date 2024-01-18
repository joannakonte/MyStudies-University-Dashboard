import React, { useEffect, useState } from 'react';
import styles from './ProfileProfessor.module.css'; 
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import { HiOutlineRefresh } from 'react-icons/hi';

function ProfileProfessor() {
  
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
                        <td className={styles.morebold}>Τηλέφωνο Επικοινωνίας:</td>
                        <td>{userData.phone}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className={styles.columns}>
                <div className={styles.uni_info}>
                  <h2 className={styles.table_title}>Στοιχεία Καθηγητή</h2>

                  <table>
                    <tbody>
                      <tr>
                        <td className={styles.morebold}>Τμήμα:</td>
                        <td>{userData.department}</td>
                      </tr>
                      <tr>
                        <td className={styles.morebold}>Όνομα Χρήστη:</td>
                        <td>{userData.sdi}</td>
                      </tr>
                      <tr>
                        <td className={styles.morebold}>Ηλεκτρονικό Ταχυδρομείο:</td>
                        <td>{userData.email}</td>
                      </tr>
                      <tr>
                        <td className={styles.morebold}>Ιδιότητα:</td>
                        <td>{userData.position}</td>
                      </tr>
                      <tr>
                        <td className={styles.morebold}>Βαθμίδα:</td>
                        <td>{userData.rank}</td>
                      </tr>
                      <tr>
                        <td className={styles.morebold}>Τομέας:</td>
                        <td>{userData.division}</td>
                      </tr>
                      <tr>
                        <td className={styles.morebold}>Αριθμός Γραφείου:</td>
                        <td>{userData.office}</td>
                      </tr>
                    </tbody>
                  </table>

                </div>

                <div className={styles.update_data}>
                  <button className={styles.dropbtn}>
                    Επεξεργασία Στοιχείων <HiOutlineRefresh />
                  </button>
                </div>

                <div className={styles.update_data}>
                  <button className={styles.dropbtn}>
                    Αλλαγή Κωδικού <HiOutlineRefresh />
                  </button>
                </div>
              </div>

            </div>            
          )}
        </div>
    </div>
  );
}
  
export default ProfileProfessor;