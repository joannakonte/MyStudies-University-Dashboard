import React, { useEffect, useState } from 'react';
import styles from './UpdateData.module.css'; 
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import Popup from './Popup';

function UpdateData() {
    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);

    const location = useLocation();
    const sdi = localStorage.getItem('sdi');
    console.log('Current sdi:', sdi);

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const closePopup = () => {
        setShowPopup(false);
        navigate('/home/profile'); // Redirect to /home/profile
    };

    useEffect(() => {
        // Fetch user data when the component mounts
        const fetchData = async () => {
            try {
                const user = await getUserBySDI(sdi);
                setUserData(user);
    
                // Initialize state variables with user data or default values
                setMaritalStatus(user ? user.maritalstatus : '');  // Use an empty string or a default value
                setGender(user ? user.gender : '');
                setBirthplace(user ? user.birthplace : '');
                setAT(user ? user.AT : '');
                setAMKA(user ? user.AMKA : '');
                setAddress(user ? user.address : '');
                setPhone(user ? user.phone : '');
                setEmail(user ? user.email : '');
    
                console.log('User data:', user);
            } catch (error) {
                console.error('Error fetching user:', error.message);
            } finally {
                // Set loading to false once the data is fetched (whether successful or not)
                setLoading(false);
            }
        };
    
        fetchData();
    }, [sdi]);

    // Function to fetch user by SDI
    async function getUserBySDI(sdi) {
        try {
        if (!sdi) {
            console.error('SDI not found in local storage.');
            return null;
        }
    
        const colRef = collection(db, 'students');
        const q = query(colRef, where('sdi', '==', sdi));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data(); // Access data directly
    
            // Log or inspect the retrieved data
            console.log('Retrieved user data:', userData);
    
            return userData;
        } else {
            console.error(`Document with sdi ${sdi} does not exist.`);
            return null;
        }
        } catch (error) {
        console.error('Error fetching user:', error.message);
        return null;
        }
    }


    const [maritalstatus, setMaritalStatus] = useState("maritalstatus"); 
    const [birthplace, setBirthplace] = useState(""); 
    const [AT, setAT] = useState(""); 
    const [gender, setGender] = useState("gender");
    const [AMKA, setAMKA] = useState("");    
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState(""); 

    async function handleUpdate(e) {
        e.preventDefault();
    
        // This object represents the user's form data that will be saved in our database.
        const docUser = {
            maritalstatus: maritalstatus,
            birthplace: birthplace,
            AT: AT,
            gender: gender,
            AMKA: AMKA,
            address: address,
            phone: phone,
            email: email,
        };
    
        try {
            console.log('Attempting data update on student:', sdi);
            if (!sdi) {
                console.error('SDI not found in local storage.');
                return;
            }
    
            if (!db) {
                console.error('Firestore database instance is not available.');
                return;
            }
    
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
                await updateDoc(userDocRef, docUser);
    
                console.log('Update data successful.');
                setShowPopup(true);
            } else {
                console.error(`Document with sdi ${sdi} does not exist.`);
            }
        } catch (error) {
            console.error('Update error:', error.message);
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
                    <div className={styles.personalDetailsContainer}>
                        <h2 className={styles.title}>Προσωπικά Στοιχεία</h2>
                        <hr className={styles.titleSeparator} />

                        <div className={styles.columns}>
                            {/* Column 1 */}
                            <div className={styles.column1}>  

                                <div className={styles.maritalStatus}>
                                    <label>
                                        <div className={styles.labelText}>Οικογενειακή Κατάσταση:</div>
                                    </label>
                                    <div className={styles.selectWrapper}>
                                        <select
                                            value={maritalstatus}
                                            className={styles['dropdown-select']}
                                            onChange={(e) => setMaritalStatus(e.target.value)}
                                        >
                                            <option value="" disabled>Οικογενειακή Κατάσταση</option>
                                            <option value="Άγαμος-η">Άγαμος-η</option>
                                            <option value="Παντρεμένος-η">Παντρεμένος-η</option>
                                        </select>
                                        <FontAwesomeIcon icon={faAngleDown} className={styles['select-arrow']} />
                                    </div>
                                </div>

                                <label>
                                    <div className={styles.labelText}>Αριθμός Ταυτότητας:</div>
                                    <input
                                        value={AT}  
                                        onChange={(e) => {
                                            setAT(e.target.value);
                                        }}
                                        type="text"
                                        name="AT"
                                        placeholder="Αριθμός Ταυτότητας"
                                        className={styles.inputField}
                                    />
                                </label>

                                <label>
                                    <div className={styles.labelText}>ΑΜΚΑ:</div>
                                    <input 
                                        value={AMKA}
                                        onChange={(e) => {
                                            console.log('Current value:', e.target.value);
                                            setAMKA(e.target.value);
                                        }}
                                        type="text"
                                        name="AMKA"
                                        placeholder="ΑΜΚΑ"
                                        className={styles.inputField}
                                    />
                                </label>

                                <label>
                                    <div className={styles.labelText}>Τήλέφωνο Επικοινωνίας:</div>
                                    <input 
                                        value={phone}
                                        onChange={(e) => {
                                            console.log('Current value:', e.target.value);
                                            setPhone(e.target.value);
                                        }}
                                        type="text"
                                        name="phone"
                                        placeholder="Τήλέφωνο Επικοινωνίας"
                                        className={styles.inputField}
                                    />
                                </label>
                            </div>

                            {/* Column 2 */}
                            <div className={styles.column2}>

                                <label>                           
                                    <div className={styles.labelText}>Πόλη - Τόπος Γέννησης:</div>
                                    <input
                                        value={birthplace}
                                        onChange={(e) => {
                                            console.log('Current value:', e.target.value);
                                            setBirthplace(e.target.value);
                                        }}
                                        type="text"
                                        name="birthplace"
                                        placeholder="Πόλη - Τόπος Γέννησης"
                                        className={styles.inputField}
                                    />
                                </label>

                                <div className={styles.gender}>
                                    <label>            
                                        <div className={styles.labelText}>Φύλο:</div>
                                    </label> 
                                    <div className={styles.selectWrapper}>
                                        <select
                                            value={gender}
                                            className={styles['dropdown-select']}
                                            onChange={(e) => setGender(e.target.value)}
                                        >
                                            <option value="" disabled>Φύλο</option>
                                            <option value="Θηλύ">Θηλύ</option>
                                            <option value="Άρρεν">Άρρεν</option>
                                            <option value="Άλλο">Άλλο</option>
                                        </select>
                                        <FontAwesomeIcon icon={faAngleDown} className={styles['select-arrow']}/>
                                    </div>
                                </div>

                                <label>          
                                    <div className={styles.labelText}>Διεύθυνση (Οδός, Νούμερο, Πόλη):</div>
                                    <input 
                                        value={address}  
                                        onChange={(e) => { 
                                            setAddress(e.target.value); 
                                        }}
                                        type="text" 
                                        name="address" 
                                        placeholder="Διεύθυνση" 
                                        className={styles.inputField}
                                    />
                                </label>
                                
                            </div>
                        </div>
                        
                    </div>

                    {/* Στοιχεία Φοιτητή */}
                    <div className={styles.studentDetailsContainer}>
                        <h2 className={styles.title}>Στοιχεία Φοιτητή</h2>
                        <hr className={styles.titleSeparator} />

                        <label>
                            <div className={styles.labelText}>Ηλεκτρονικό Ταχυδρομείο:</div>
                            <input 
                                value={email}  
                                onChange={(e) => { 
                                    setEmail(e.target.value); 
                                }}
                                type="email" 
                                name="email" 
                                placeholder="Ηλεκτρονικό Ταχυδρομείο" 
                                className={styles.inputField}
                            />
                        </label>

                        <div className={styles.columns}>
                            {/* Column 1 */}

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
                                handleUpdate(e);
                            }}
                            className={styles.registerButton}
                        >
                            Αποθήκευση
                        </button>
                        {showPopup && (
                        <Popup message="Τα δεδομένα σας ενημερώθηκαν επιτυχώς" onClose={closePopup} />
                        )}
                    </div>
                </div>
            </form>
        </div>
    </div>
  );
}
  
export default UpdateData;