import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './RegisterStudent.module.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase'

function RegisterStudent() {
    const navigate = useNavigate();
    const [firstname, setFirstName] = useState(""); 
    const [fathername, setFatherName] = useState(""); 
    const [birthday, setBirthday] = useState(""); 
    const [maritalstatus, setMaritalStatus] = useState("maritalstatus"); 
    const [AT, setAT] = useState(""); 
    const [lastname, setLastName] = useState("");
    const [mothername, setMotherName] = useState(""); 
    const [birthplace, setBirthplace] = useState(""); 
    const [gender, setGender] = useState("gender");
    const [AMKA, setAMKA] = useState("");    
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState(""); 
    const [AM, setAM] = useState(""); 
    const sdiValue = "sdi" + AM.slice(-7);
    const [registrationdate, setRegistrationDate] = useState(""); 
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
        if (!firstname || !lastname || !fathername || !mothername || !AM) {
            return "Παρακαλώ συμπληρώστε τα υποχρεωτικά πεδία.";
        }
        else if(password.length < 8){
            return "Ο κωδικός πρόσβασης πρέπει να έχει τουλάχιστον 8 χαρακτήρες.";
        }
        else if(password !== passwordVerification){
            return "Οι κωδικοί πρόσβασης δεν ταιριάζουν.";
        }
        return ""; // No error
    };
    
    async function handleRegister(e){
        e.preventDefault();

        // This object represents the user's form that it will be saved in our database.
        const docUser = {
            type: "student",
            firstname: firstname,
            lastname: lastname,
            department: "Πληροφορικής και Τηλεποικοινωνιών",
            AM: AM,
            fathername: fathername,
            mothername: mothername,
            birthday: birthday,
            maritalstatus: maritalstatus,
            gender: gender,
            birthplace: birthplace,
            AT: AT,
            sdi: sdiValue,
            AMKA: AMKA,
            address: address,
            phone: phone,
            registrationdate: registrationdate,
            email: email,
            password: password
        };

        try{
            console.log('Attempting register student:', firstname);
            if (!db) {
                console.error('Firestore database instance is not available.');
                return;
            }

            const col_ref = collection(db, "students");
            const res_user = await addDoc(col_ref, docUser); 

            // Redirect to login route
            navigate('/home/login');

        } catch (error) {
            console.error('Registration error:', error.message);
        }
    }

    return (
        <div> 
            <form>
                <div className={styles.formContainer}>
                    <div className={styles.personalDetailsContainer}>
                        <h2 className={styles.title}>Προσωπικά Στοιχεία</h2>
                        <hr className={styles.titleSeparator} />

                        <div className={styles.columns}>
                            {/* Column 1 */}
                            <div className={styles.column1}>  
                                <label>
                                    <div className={styles.labelText}>Όνομα: <sup>*</sup></div>
                                    <input 
                                        value={firstname} 
                                        onChange={(e) => { 
                                            setFirstName(e.target.value); 
                                        }}
                                        type="text" 
                                        name="firstname" 
                                        placeholder="Όνομα" 
                                        className={styles.inputField}
                                    />
                                </label>

                                <label>
                                    <div className={styles.labelText}>Όνομα Πατέρα: <sup>*</sup></div>
                                    <input 
                                        value={fathername} 
                                        onChange={(e) => { 
                                            setFatherName(e.target.value); 
                                        }}
                                        type="text" 
                                        name="fathername" 
                                        placeholder="Όνομα Πατέρα" 
                                        className={styles.inputField} 
                                    />
                                </label>

                                <label>
                                    <div className={styles.labelText}>Ημερομηνία Γέννησης: <sup>*</sup></div>
                                    <input 
                                        value={birthday} 
                                        onChange={(e) => { 
                                            setBirthday(e.target.value); 
                                        }}
                                        type="date" 
                                        name="birthday" 
                                        className={styles.dateField} 
                                    />
                                </label>

                                <div className={styles.maritalStatus}>
                                    <label> 
                                        <div className={styles.labelText}>Οικογενειακή Κατάσταση:</div>
                                    </label> 
                                    <div className={styles.selectWrapper}>
                                        <select value={maritalstatus} className={styles['dropdown-select']} onChange={(e) => setMaritalStatus(e.target.value)}> 
                                            <option value="role">Οικογενειακή Κατάσταση</option> 
                                            <option value="individual">Άγαμος-η</option> 
                                            <option value="business">Παντρεμένος-η</option> 
                                        </select>
                                        <FontAwesomeIcon icon={faAngleDown} className={styles['select-arrow']}/>
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
                            </div>

                            {/* Column 2 */}
                            <div className={styles.column2}>
                                <label>
                                    <div className={styles.labelText}>Επώνυμο: <sup>*</sup></div>
                                    <input 
                                        value={lastname} 
                                        onChange={(e) => { 
                                            setLastName(e.target.value); 
                                        }}
                                        type="text" 
                                        name="lastname" 
                                        placeholder="Επώνυμο"
                                        className={styles.inputField} 
                                    />
                                </label>

                                <label>
                                    <div className={styles.labelText}>Όνομα Μητέρας: <sup>*</sup></div>
                                    <input 
                                        value={mothername} 
                                        onChange={(e) => { 
                                            setMotherName(e.target.value); 
                                        }}
                                        type="text" 
                                        name="mothername" 
                                        placeholder="Όνομα Μητέρας" 
                                        className={styles.inputField} 
                                    />
                                </label>

                                <label>                           
                                    <div className={styles.labelText}>Πόλη - Τόπος Γέννησης:</div>
                                    <input 
                                        value={birthplace} 
                                        onChange={(e) => { 
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
                                        <select value={gender} className={styles['dropdown-select']} onChange={(e) => setGender(e.target.value)}> 
                                            <option value="Φύλο">Φύλο</option> 
                                            <option value="Θηλύ">Θηλύ</option> 
                                            <option value="Άρρεν">Άρρεν</option> 
                                            <option value="Άλλο">Άλλο</option> 
                                        </select>
                                        <FontAwesomeIcon icon={faAngleDown} className={styles['select-arrow']}/>
                                    </div>
                                </div>
                                <label>
                                    <div className={styles.labelText}>ΑΜΚΑ:</div>
                                    <input 
                                        value={AMKA} 
                                        onChange={(e) => { 
                                            setAMKA(e.target.value); 
                                        }}
                                        type="text" 
                                        name="AMKA" 
                                        placeholder="ΑΜΚΑ" 
                                        className={styles.inputField}
                                    />
                                </label>
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
                        <label>
                            <div className={styles.labelText}>Τήλέφωνο Επικοινωνίας:</div>
                            <input 
                                value={phone} 
                                onChange={(e) => { 
                                    setPhone(e.target.value); 
                                }}
                                type="text" 
                                name="phone" 
                                placeholder="Τήλέφωνο Επικοινωνίας" 
                                className={styles.inputPhoneNumber}
                            />
                        </label>
                    </div>

                    {/* Στοιχεία Φοιτητή */}
                    <div className={styles.studentDetailsContainer}>
                        <h2 className={styles.title}>Στοιχεία Φοιτητή</h2>
                        <hr className={styles.titleSeparator} />

                        <label>
                            <div className={styles.labelText}>Τμήμα:</div>
                            <input 
                                name="department" 
                                defaultValue="Πληροφορικής και Τηλεποικοινωνιών"
                                className={styles.departmentField}
                            />
                        </label>

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
                            <div className={styles.column1}>
                                <label>
                                    <div className={styles.labelText}>Αριθμός Μητρώου <sup>*</sup></div>
                                    <input 
                                        value={AM} 
                                        onChange={(e) => { 
                                            setAM(e.target.value); 
                                        }}
                                        type="text" 
                                        name="AM" 
                                        placeholder="Αριθμός Μητρώου" 
                                        className={styles.inputField}
                                    />
                                </label>
                            </div>

                            <div className={styles.column2}>  
                                <label>
                                    <div className={styles.labelText}>Ημερομηνία Εγγραφής</div>
                                    <input 
                                        value={registrationdate} 
                                        onChange={(e) => { 
                                            setRegistrationDate(e.target.value); 
                                        }}
                                        type="date" 
                                        name="registrationdate" 
                                        className={styles.dateField}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Κωδικός Πρόσβασης */}
                    <div className={styles.passwordContainer}>
                        <h2 className={styles.title}>Κωδικός Πρόσβασης</h2>
                        <hr className={styles.titleSeparator} />

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
                    <div className={styles.buttonContainer}>
                        <Link to="/" className={styles.cancelButton}>
                            Ακύρωση
                        </Link>
                        <button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                const validationResult = isFormValid();
                                if (validationResult) {
                                    alert(validationResult);
                                } else {
                                    handleRegister(e);
                                }
                            }}
                            className={styles.registerButton}
                        >
                            Εγγραφή
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RegisterStudent;
